import { useState, useRef, ChangeEvent, useEffect } from "react";
import { v4 } from "uuid";
import { deleteImageFromIdb, getPicturesStore, getUploadStatusStore } from "../idb";
import { InputGroup } from "#components/InputGroup.tsx";
import { useMutation, useQuery } from "@tanstack/react-query";
import { del, get, set } from "idb-keyval";
import { useFormContext } from "react-hook-form";
import Badge from "@codegouvfr/react-dsfr/Badge";
import Button from "@codegouvfr/react-dsfr/Button";
import { createModal } from "@codegouvfr/react-dsfr/Modal";
import { ImageCanvas, Line } from "./DrawingCanvas";
import { api } from "../../api";
import { db, useDbQuery } from "../../db/db";
import { Pictures, Report } from "../../db/AppSchema";
import imageCompression from "browser-image-compression";
import { Box, Grid, Stack, Typography } from "@mui/material";
import { Flex } from "#components/ui/Flex.tsx";
import { Center } from "#components/MUIDsfr.tsx";

const modal = createModal({
  id: "edit-picture",
  isOpenedByDefault: false,
});

export const UploadImage = ({ reportId }: { reportId: string }) => {
  const [statusMap, setStatusMap] = useState<Record<string, string>>({});
  const [selectedPicture, setSelectedPicture] = useState<{ id: string; url: string } | null>(null);

  const linesQuery = useQuery({
    queryKey: ["lines", selectedPicture?.id],
    queryFn: async () => {
      const linesQuery = await db
        .selectFrom("picture_lines")
        .where("pictureId", "=", selectedPicture!.id)
        .selectAll()
        .execute();

      return JSON.parse(linesQuery?.[0]?.lines ?? "[]");
    },
    enabled: !!selectedPicture,
  });

  const ref = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const uploadImageMutation = useMutation(async (files: File[]) => {
    for (const file of files) {
      const picId = v4();
      ref.current!.value = "";
      const buffer = await processImage(file);

      await set(picId, buffer, getPicturesStore());
      await db.insertInto("pictures").values({ id: picId, reportId, createdAt: new Date().toISOString() }).execute();

      setStatusMap((prev) => ({ ...prev, [picId]: "uploading" }));
    }
  });

  const onChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    await uploadImageMutation.mutateAsync(Array.from(files));
  };

  useEffect(() => {
    const listener = (event: MessageEvent) => {
      if (event.data.type === "status") {
        setStatusMap((prev) => ({ ...prev, [event.data.id]: event.data.status }));
      }
    };

    broadcastChannel.addEventListener("message", listener);

    return () => broadcastChannel.removeEventListener("message", listener);
  }, []);

  return (
    <>
      <Box
        display={selectedPicture ? "initial" : "none"}
        zIndex="1000"
        position="fixed"
        top="0"
        left="0"
        right="0"
        bottom="0"
        width="100vw"
        height="100vh"
      >
        <Box bgcolor="rgba(0, 0, 0, 0.5)" position="fixed" top="0" left="0" right="0" bottom="0"></Box>
        <Center width="100%" height="100%">
          <Box
            ref={containerRef}
            bgcolor="white"
            position="relative"
            width={{ xs: "100%", lg: "634px" }}
            height={{ xs: "100vh", lg: "792px" }}
            maxHeight={{ xs: "100vh", lg: "100vh" }}
          >
            {selectedPicture ? (
              <ImageCanvas
                closeModal={() => setSelectedPicture(null)}
                pictureId={selectedPicture.id}
                url={selectedPicture.url}
                containerRef={containerRef}
                lines={linesQuery.data}
              />
            ) : null}
          </Box>
        </Center>
      </Box>
      <Button
        type="button"
        iconId="ri-add-line"
        // disabled={!canUploadImage}
        priority="secondary"
        nativeButtonProps={{
          type: "button",
          onClick: () => ref.current?.click(),
        }}
      >
        Ajouter photo
      </Button>
      <input ref={ref as any} type="file" accept="image/*" onChange={onChange} multiple style={{ display: "none" }} />
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

  const picturesQuery = useDbQuery(
    db.selectFrom("pictures").where("reportId", "=", reportId).orderBy("createdAt asc").selectAll(),
  );

  const pictures = picturesQuery.data ?? [];

  if (!pictures?.length) return null;

  return (
    <Flex flexDirection="column" width="100%" my="40px">
      <InputGroup>
        <Grid gap="16px" gridTemplateColumns={{ xs: "repeat(2, 1fr)", md: "repeat(3, 1fr)", lg: "repeat(4, 1fr)" }}>
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
    await db.deleteFrom("pictures").where("id", "=", picture.id).execute();

    return "ok";
  });

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const bgUrlQuery = useQuery({
    queryKey: ["picture", picture.id, picture.url],
    queryFn: async () => {
      const buffer = await get(picture.id, getPicturesStore());
      if (!buffer) return picture.url;
      const blob = new Blob([buffer], { type: "image/png" });

      return URL.createObjectURL(blob);
    },
    refetchOnWindowFocus: false,
  });

  const pictureLines = useDbQuery(db.selectFrom("picture_lines").where("pictureId", "=", picture.id).selectAll());

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
  }, [bgUrlQuery.data, pictureLines.data]);

  const drawCanvas = () => {
    if (!canvasRef.current) return;
    if (!bgUrlQuery.data) return;
    if (!pictureLines.data) return;

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

      const lines = JSON.parse(pictureLines.data?.[0]?.lines ?? "[]");

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

  const finalStatus = status ?? idbStatusQuery.data ?? "success";

  const bgUrl = bgUrlQuery.data;

  return (
    <Stack minWidth="150px" maxWidth="180px">
      <ReportStatus status={finalStatus as any} />
      <Flex flexDirection="column" justifyContent="flex-end" height="170px">
        <Box ref={canvasRef} component="canvas" flex="1"></Box>
        <Flex bgcolor="white" alignItems="center" border="1px solid #DFDFDF" height="40px">
          <Box
            onClick={() => {
              setSelectedPicture({ id: picture.id, url: bgUrl! });
              modal.open();
            }}
            borderRight="1px solid #DFDFDF"
          >
            <Button type="button" iconId="ri-pencil-fill" priority="tertiary no outline">
              {null}
            </Button>
          </Box>
          <Box flex="1" pl="5px">
            N° {index + 1}
          </Box>
          <Box onClick={() => deletePictureMutation.mutate()} borderLeft="1px solid #DFDFDF">
            <Button type="button" iconId="ri-close-circle-fill" priority="tertiary no outline">
              {null}
            </Button>
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
      severity={"info"}
      noIcon
      small
      style={{
        backgroundColor: bgColor,
        color,
        display: "flex",
        alignItems: "center",
      }}
    >
      <Typography
        className={icon}
        sx={{
          "::before": {
            width: "12px !important",
            height: "12px !important",
            verticalAlign: "middle !important",
          },
        }}
      />
      <Typography ml="4px">{label}</Typography>
    </Badge>
  );
};

const statusData = {
  uploading: { label: "En cours", bgColor: "#FEE7FC", color: "#855080", icon: "fr-icon-refresh-line" },
  success: { label: "Ok", bgColor: "#B8FEC9", color: "#18753C", icon: "fr-icon-success-line" },
  error: { label: "Erreur", bgColor: "#FEC9C9", color: "#853C3C", icon: "fr-icon-warning-line" },
};

const processImage = async (file: File) => {
  try {
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
      preserveExif: false,
    };

    const compressedFile = await imageCompression(file, options);
    return compressedFile.arrayBuffer();
  } catch (error) {
    console.error("Error processing image:", error);
    throw error;
  }
};
