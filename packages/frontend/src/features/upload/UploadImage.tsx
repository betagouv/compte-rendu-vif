import { useState, useRef, ChangeEvent, useEffect } from "react";
import { v4, v7 } from "uuid";
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
import { attachmentQueue, attachmentStorage, db, getAttachmentUrl, useDbQuery } from "../../db/db";
import { Pictures, Report, ReportAttachment } from "../../db/AppSchema";
import imageCompression from "browser-image-compression";
import { Box, Grid, Stack, Typography } from "@mui/material";
import { Flex } from "#components/ui/Flex.tsx";
import { Center } from "#components/MUIDsfr.tsx";
import { useLiveUser } from "../../contexts/AuthContext";
import { AttachmentState } from "@powersync/attachments";

const modal = createModal({
  id: "edit-picture",
  isOpenedByDefault: false,
});

export const UploadImage = ({ reportId }: { reportId: string }) => {
  const [selectedPicture, setSelectedPicture] = useState<{ id: string; url: string } | null>(null);
  const user = useLiveUser();

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
      const picId = `${reportId}/images/${v7()}.jpg`;
      ref.current!.value = "";
      const buffer = await processImage(file);

      await attachmentQueue.saveReportAttachment({
        attachmentId: picId,
        buffer,
        mediaType: "image/jpeg",
      });

      await db
        .insertInto("report_attachment")
        .values({
          id: picId,
          attachment_id: picId,
          report_id: reportId,
          service_id: user!.service_id,
          created_at: new Date().toISOString(),
          is_deprecated: 0,
        })
        .execute();
    }
  });

  const onChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    await uploadImageMutation.mutateAsync(Array.from(files));
  };

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
      <ReportPictures setSelectedPicture={setSelectedPicture} />
    </>
  );
};

const ReportPictures = ({
  setSelectedPicture,
}: {
  setSelectedPicture: (props: { id: string; url: string }) => void;
}) => {
  const form = useFormContext<Report>();

  const reportId = form.getValues().id;

  const picturesQuery = useDbQuery(
    db
      .selectFrom("report_attachment")
      .where("is_deprecated", "=", 0)
      .where("report_id", "=", reportId)
      .selectAll()
      .orderBy("created_at", "asc"),
  );
  console.log(picturesQuery.data);
  const pictures = picturesQuery.data ?? [];

  if (!pictures?.length) return null;

  return (
    <Flex flexDirection="column" width="100%" my="40px">
      <InputGroup>
        <Grid
          display="grid"
          gap="16px"
          gridTemplateColumns={{ xs: "repeat(2, 1fr)", md: "repeat(3, 1fr)", lg: "repeat(4, 1fr)" }}
        >
          {pictures?.map((picture, index) => (
            <PictureThumbnail
              setSelectedPicture={setSelectedPicture}
              key={picture.id}
              picture={picture}
              index={index}
            />
          ))}
        </Grid>
      </InputGroup>
    </Flex>
  );
};

const PictureThumbnail = ({
  picture,
  index,
  setSelectedPicture,
}: {
  picture: ReportAttachment;
  index: number;
  setSelectedPicture: (props: { id: string; url: string }) => void;
}) => {
  const deletePictureMutation = useMutation(async () => {
    await attachmentStorage.deleteFile(picture.id);
    await db.deleteFrom("report_attachment").where("id", "=", picture.id).execute();

    return "ok";
  });

  const idbStatusQuery = useDbQuery(db.selectFrom("attachments").where("id", "=", picture.id).select("state"));
  const status = idbStatusQuery.data?.[0]?.state;
  const bgUrlQuery = useQuery({
    queryKey: ["picture", picture.id, status],
    queryFn: async () => {
      const buffer = await getAttachmentUrl(picture.id);
      return buffer;
    },
    refetchOnWindowFocus: false,
    enabled: status === AttachmentState.SYNCED || status === AttachmentState.QUEUED_UPLOAD,
  });

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const pictureLines = useDbQuery(db.selectFrom("picture_lines").where("pictureId", "=", picture.id).selectAll());

  useEffect(() => {
    drawCanvas();
  }, [pictureLines.data, bgUrlQuery.data]);

  const drawCanvas = () => {
    if (!canvasRef.current) return;
    if (!bgUrlQuery.data) return;
    if (!pictureLines.data) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d")!;

    const image = new Image();
    image.src = bgUrlQuery.data!;
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

  const finalStatus = idbStatusQuery.data?.[0]?.state ?? AttachmentState.QUEUED_UPLOAD;
  return (
    <Stack minWidth="150px" maxWidth="180px">
      <ReportStatus status={finalStatus as any} />
      <Flex flexDirection="column" justifyContent="flex-end" height="170px">
        <Box ref={canvasRef} component="canvas" flex="1"></Box>
        <Flex bgcolor="white" alignItems="center" border="1px solid #DFDFDF" height="40px">
          <Box
            onClick={() => {
              setSelectedPicture({ id: picture.id, url: bgUrlQuery.data! });
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

const ReportStatus = ({ status }: { status: AttachmentState }) => {
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

const statusData: Record<AttachmentState, any> = {
  [AttachmentState.QUEUED_UPLOAD]: {
    label: "En cours",
    bgColor: "#FEE7FC",
    color: "#855080",
    icon: "fr-icon-refresh-line",
  },
  [AttachmentState.SYNCED]: { label: "Ok", bgColor: "#B8FEC9", color: "#18753C", icon: "fr-icon-success-line" },
  [AttachmentState.ARCHIVED]: { label: "Erreur", bgColor: "#FEC9C9", color: "#853C3C", icon: "fr-icon-warning-line" },
  [AttachmentState.QUEUED_SYNC]: {
    label: "En cours",
    bgColor: "#FEE7FC",
    color: "#855080",
    icon: "fr-icon-refresh-line",
  },
  [AttachmentState.QUEUED_DOWNLOAD]: {
    label: "En cours",
    bgColor: "#FEE7FC",
    color: "#855080",
    icon: "fr-icon-refresh-line",
  },
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
