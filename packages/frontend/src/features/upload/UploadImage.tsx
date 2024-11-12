import { useState, useRef, ChangeEvent, useEffect } from "react";
import { v4 } from "uuid";
import { db } from "../../db";
import {
  deleteImageFromIdb,
  getPicturesStore,
  getToPingStore,
  getToUploadStore,
  getUploadStatusStore,
  syncImages,
  syncPictureLines,
} from "../idb";
import { Box, Flex, Grid, Stack, styled } from "#styled-system/jsx";
import { InputGroup } from "#components/InputGroup.tsx";
import { cx } from "#styled-system/css";
import { Tmp_pictures, Pictures, Report } from "@cr-vif/electric-client/frontend";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useLiveQuery } from "electric-sql/react";
import { del, get, set } from "idb-keyval";
import { useFormContext } from "react-hook-form";
import Badge from "@codegouvfr/react-dsfr/Badge";
import Button from "@codegouvfr/react-dsfr/Button";
import { css } from "#styled-system/css";
import { createModal } from "@codegouvfr/react-dsfr/Modal";
import { ImageCanvas, Line } from "./DrawingCanvas";
import { api } from "../../api";

const modal = createModal({
  id: "edit-picture",
  isOpenedByDefault: false,
});

export const UploadImage = ({ reportId }: { reportId: string }) => {
  const [statusMap, setStatusMap] = useState<Record<string, string>>({});
  const [selectedPicture, setSelectedPicture] = useState<{ id: string; url: string } | null>(null);

  const notifyPictureLines = useMutation(async ({ pictureId, lines }: { pictureId: string; lines: Array<Line> }) => {
    try {
      const result = await api.post(`/api/upload/picture/${pictureId}/lines` as any, { body: { lines } });
      await del(pictureId, getToPingStore());

      return result;
    } catch (e) {
      await set(pictureId, JSON.stringify(lines), getToPingStore());
      syncPictureLines();
    }
  });

  // const linesQuery = useLiveQuery(db.picture_lines.liveMany({ where: { pictureId: selectedPicture?.id } }));

  const linesQuery = useQuery({
    queryKey: ["lines", selectedPicture?.id],
    queryFn: async () => {
      const pictureLines = await db.picture_lines.findFirst({ where: { pictureId: selectedPicture?.id } });
      return JSON.parse(pictureLines?.lines ?? "[]");
    },
    enabled: !!selectedPicture,
  });

  const ref = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const uploadImageMutation = useMutation(async (file: File) => {
    const picId = v4();
    const buffer = await getArrayBufferFromBlob(file);

    await db.tmp_pictures.create({ data: { id: picId, reportId, createdAt: new Date() } });
    await set(picId, buffer, getPicturesStore());

    try {
      const formData = new FormData();

      formData.append("file", new Blob([buffer]), "file");
      formData.append("reportId", reportId);
      formData.append("pictureId", picId);

      await api.post("/api/upload/image", {
        body: formData,
        query: { reportId: reportId, id: picId },
      } as any);
    } catch {
      await set(picId, reportId, getToUploadStore());
      syncImages();
    }
  });

  const onChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    await uploadImageMutation.mutateAsync(file);
  };

  useEffect(() => {
    const listener = (event: MessageEvent) => {
      console.log("message", event.data);
      if (event.data.type === "status") {
        console.log("status", event.data.id, event.data.status);
        setStatusMap((prev) => ({ ...prev, [event.data.id]: event.data.status }));
      }
    };

    broadcastChannel.addEventListener("message", listener);

    return () => broadcastChannel.removeEventListener("message", listener);
  }, []);

  return (
    <>
      <styled.div
        ref={containerRef}
        display={selectedPicture ? "initial" : "none"}
        zIndex="1000"
        pos="fixed"
        top="0"
        left="0"
        right="0"
        bottom="0"
        w="100%"
        h={{ base: "100vh" }}
        bgColor="white"
      >
        {selectedPicture ? (
          <ImageCanvas
            closeModal={() => setSelectedPicture(null)}
            notifyPictureLines={notifyPictureLines.mutate}
            pictureId={selectedPicture.id}
            url={selectedPicture.url}
            containerRef={containerRef}
            lines={linesQuery.data}
          />
        ) : null}
      </styled.div>
      <Button
        type="button"
        iconId="ri-add-line"
        priority="secondary"
        nativeButtonProps={{
          type: "button",
          onClick: () => ref.current?.click(),
        }}
      >
        Ajouter photo
      </Button>
      <styled.input ref={ref as any} type="file" accept="image/*" onChange={onChange} display="none" />
      <ReportPictures setSelectedPicture={setSelectedPicture} statusMap={statusMap} />
    </>
  );
};

const broadcastChannel = new BroadcastChannel("sw-messages");

const ReportPictures = ({
  statusMap,
  setSelectedPicture,
}: {
  statusMap: Record<string, string>;
  setSelectedPicture: (props: { id: string; url: string }) => void;
}) => {
  const form = useFormContext<Report>();

  const reportId = form.getValues().id;

  const tmpPicturesQuery = useLiveQuery(
    db.tmp_pictures.liveMany({ where: { reportId }, orderBy: { createdAt: "desc" } }),
  );

  const picturesQuery = useLiveQuery(
    db.pictures.liveMany({
      where: { reportId },
      orderBy: { createdAt: "desc" },
    }),
  );

  const pictures = mergePictureArrays(tmpPicturesQuery.results ?? [], picturesQuery.results ?? []);

  return (
    <Flex direction="column" w="100%" my="40px">
      <InputGroup>
        {/* <Flex gap="16px" direction="column"> */}
        <Grid gap="16px" gridTemplateColumns={{ base: "repeat(2, 1fr)", md: "repeat(3, 1fr)", lg: "repeat(4, 1fr)" }}>
          {pictures?.map((picture, index) => (
            <PictureThumbnail
              setSelectedPicture={setSelectedPicture}
              key={picture.id}
              picture={picture as any}
              index={index}
              status={statusMap[picture.id]}
            />
          ))}
        </Grid>
        {/* </Flex> */}
      </InputGroup>
    </Flex>
  );
};

const mergePictureArrays = (a: Tmp_pictures[], b: Pictures[]) => {
  const map = new Map<string, Tmp_pictures>();

  const sortByDate = (a: Tmp_pictures, b: Tmp_pictures) => {
    return new Date(a.createdAt!).getTime() - new Date(b.createdAt!).getTime();
  };

  for (const item of a) {
    map.set(item.id, item);
  }

  for (const item of b) {
    map.set(item.id, item);
  }

  return Array.from(map.values()).sort(sortByDate);
};

const PictureThumbnail = ({
  picture,
  index,
  status,
  setSelectedPicture,
}: {
  picture: Pictures;
  index: number;
  status?: string;
  setSelectedPicture: (props: { id: string; url: string }) => void;
}) => {
  const deletePictureMutation = useMutation(async () => {
    await deleteImageFromIdb(picture.id);
    await db.tmp_pictures.delete({ where: { id: picture.id } }).catch(() => {});
    await db.pictures.delete({ where: { id: picture.id } }).catch(() => {});

    return "ok";
  });

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const bgUrlQuery = useQuery({
    queryKey: ["picture", picture.id, picture.url],
    queryFn: async () => {
      // if (picture.url) return picture.finalUrl ?? picture.url;
      const buffer = await get(picture.id, getPicturesStore());
      if (!buffer) return picture.url;
      const blob = new Blob([buffer], { type: "image/png" });

      return URL.createObjectURL(blob);
    },
    refetchOnWindowFocus: false,
  });

  const pictureLines = useLiveQuery(db.picture_lines.liveMany({ where: { pictureId: picture.id } }));

  const idbStatusQuery = useQuery({
    queryKey: ["picture-status", picture.id],
    queryFn: async () => {
      const status = await get(picture.id, getUploadStatusStore());
      return status ?? null;
    },
    enabled: !status,
  });

  useEffect(() => {
    drawCanvas();
  }, [bgUrlQuery.data, pictureLines.results]);

  const drawCanvas = () => {
    if (!canvasRef.current) return;
    if (!bgUrlQuery.data) return;
    if (!pictureLines.results) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d")!;

    const image = new Image();
    image.src = bgUrlQuery.data;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = 180 * dpr;
    canvas.height = 130 * dpr;

    ctx.scale(dpr, dpr);

    image.onload = () => {
      const scaleX = 180 / image.width;
      const scaleY = 130 / image.height;
      const initialScale = Math.min(scaleX, scaleY) * 1.5;

      const xOffset = (180 - image.width * initialScale) / 2;
      const yOffset = (130 - image.height * initialScale) / 2;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();

      ctx.translate(xOffset, yOffset);
      ctx.scale(initialScale, initialScale);

      ctx.drawImage(image, 0, 0, image.width, image.height);

      const lines = JSON.parse(pictureLines.results?.[0]?.lines ?? "[]");

      ctx.lineWidth = 5;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      lines.forEach((line: any) => {
        ctx.beginPath();
        ctx.strokeStyle = line.color;
        if (line.points.length > 0) {
          ctx.moveTo(line.points[0].x, line.points[0].y);
          for (let i = 1; i < line.points.length; i++) {
            ctx.lineTo(line.points[i].x, line.points[i].y);
          }
          ctx.stroke();
        }
      });
    };
  };

  const finalStatus = picture.url ? "success" : status ?? idbStatusQuery.data ?? "uploading";

  const bgUrl = bgUrlQuery.data;

  return (
    <Stack>
      {/* <Badge severity={finalStatus === "uploading" ? }></Badge> */}
      <ReportStatus status={finalStatus as any} />
      <Flex
        // style={bgUrl ? { backgroundImage: `url(${bgUrl})` } : { backgroundColor: "gray" }}
        flexDir="column"
        justifyContent="flex-end"
        w="180px"
        h="170px"
        // bgPosition="center calc(50% - 20px)"
        // bgRepeat="no-repeat"
        // backgroundSize="cover"
      >
        <styled.canvas ref={canvasRef} flex="1"></styled.canvas>
        <Flex alignItems="center" border="1px solid #DFDFDF" h="40px" bgColor="white">
          <Box
            onClick={() => {
              setSelectedPicture({ id: picture.id, url: bgUrl! });
              modal.open();
            }}
            borderRight="1px solid #DFDFDF"
          >
            <Button type="button" iconId="ri-pencil-fill" priority="tertiary no outline" />
          </Box>
          <Box flex="1" pl="5px">
            N° {index + 1}
          </Box>
          <Box onClick={() => deletePictureMutation.mutate()} borderLeft="1px solid #DFDFDF">
            <Button type="button" iconId="ri-close-circle-fill" priority="tertiary no outline" />
            {/* {finalStatus ? <span>{finalStatus}</span> : null} */}
            {/* <styled.i className={fr.cx("fr-icon--md", "fr-icon-close-circle-fill")} /> */}
          </Box>
        </Flex>
      </Flex>
    </Stack>
  );
};

const ReportStatus = ({ status }: { status: "uploading" | "success" | "error" }) => {
  const { color, bgColor, label, icon } = statusData[status];

  return (
    <Badge
      className={css({ display: "flex", alignItems: "center" })}
      severity={"info"}
      noIcon
      small
      style={{
        backgroundColor: bgColor,
        color,
        // backgroundColor: colors[status][1],
        // color: colors[status][0],
      }}
    >
      <styled.span
        className={cx(
          icon,
          css({ "&::before": { w: "12px !important", h: "12px !important", verticalAlign: "middle !important" } }),
        )}
      />
      <styled.span ml="4px">{label}</styled.span>
    </Badge>
  );
};

const statusData = {
  uploading: { label: "En cours", bgColor: "#FEE7FC", color: "#855080", icon: "fr-icon-refresh-line" },
  success: { label: "Ok", bgColor: "#B8FEC9", color: "#18753C", icon: "fr-icon-success-line" },
  error: { label: "Erreur", bgColor: "#FEC9C9", color: "#853C3C", icon: "fr-icon-warning-line" },
};

async function getArrayBufferFromBlob(blob: Blob) {
  return new Promise<ArrayBuffer>((resolve, _) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as ArrayBuffer);
    reader.readAsArrayBuffer(blob);
  });
}
