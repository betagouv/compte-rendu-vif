import { useState, useRef, ChangeEvent, useEffect } from "react";
import { v4 } from "uuid";
import { deleteImageFromIdb, getPicturesStore, getUploadStatusStore } from "../idb";
import { Box, Center, Flex, Grid, Stack, styled } from "#styled-system/jsx";
import { InputGroup } from "#components/InputGroup.tsx";
import { cx } from "#styled-system/css";
import { useMutation, useQuery } from "@tanstack/react-query";
import { del, get, set } from "idb-keyval";
import { useFormContext } from "react-hook-form";
import Badge from "@codegouvfr/react-dsfr/Badge";
import Button from "@codegouvfr/react-dsfr/Button";
import { css } from "#styled-system/css";
import { createModal } from "@codegouvfr/react-dsfr/Modal";
import { ImageCanvas, Line } from "./DrawingCanvas";
import { api } from "../../api";
import { db, useDbQuery } from "../../db/db";
import { Pictures, Report } from "../../db/AppSchema";
import imageCompression from "browser-image-compression";

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
        display={selectedPicture ? "initial" : "none"}
        zIndex="1000"
        pos="fixed"
        top="0"
        left="0"
        right="0"
        bottom="0"
        w="100vw"
        h="100vh"
        // w={{ base: "100%", lg: "634px" }}
        // h={{ base: "100vh", lg: "792px" }}
      >
        <styled.div pos="fixed" top="0" left="0" right="0" bottom="0" bgColor="rgba(0, 0, 0, 0.5)"></styled.div>
        <Center w="100%" h="100%">
          <styled.div
            ref={containerRef}
            position="relative"
            w={{ base: "100%", lg: "634px" }}
            h={{ base: "100vh", lg: "792px" }}
            maxH={{ base: "100vh", lg: "100vh" }}
            bgColor="white"
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
          </styled.div>
        </Center>
      </styled.div>
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
      {/* {!canUploadImage ? (
        <styled.div mt="16px" color="gray">
          Le téléversement d'image est désactivé temporairement, mais il revient optimisé bientôt.
        </styled.div>
      ) : null} */}
      <styled.input ref={ref as any} type="file" accept="image/*" onChange={onChange} multiple display="none" />
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

  // const tmpPicturesQuery = useLiveQuery(
  //   db.tmp_pictures.liveMany({ where: { reportId }, orderBy: { createdAt: "desc" } }),
  // );

  // const picturesQuery = useLiveQuery(
  //   db.pictures.liveMany({
  //     where: { reportId },
  //     orderBy: { createdAt: "desc" },
  //   }),
  // );

  const pictures = picturesQuery.data ?? [];

  if (!pictures?.length) return null;

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
      // if (picture.url) return picture.finalUrl ?? picture.url;
      const buffer = await get(picture.id, getPicturesStore());
      if (!buffer) return picture.url;
      const blob = new Blob([buffer], { type: "image/png" });

      return URL.createObjectURL(blob);
    },
    refetchOnWindowFocus: false,
  });

  const pictureLines = useDbQuery(db.selectFrom("picture_lines").where("pictureId", "=", picture.id).selectAll());

  // const pictureLines = useLiveQuery(db.picture_lines.liveMany({ where: { pictureId: picture.id } }));

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
    <Stack minW="150px" maxW="180px">
      {/* <Badge severity={finalStatus === "uploading" ? }></Badge> */}
      <ReportStatus status={finalStatus as any} />
      <Flex
        // style={bgUrl ? { backgroundImage: `url(${bgUrl})` } : { backgroundColor: "gray" }}
        flexDir="column"
        justifyContent="flex-end"
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
