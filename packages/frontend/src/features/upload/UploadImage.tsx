import { useState, useRef, ChangeEvent, useEffect } from "react";
import { v4 } from "uuid";
import { db } from "../../db";
import { deleteImageFromIdb, getPicturesStore, getToUploadStore, getUploadStatusStore, syncImages } from "../idb";
import { Box, Flex, Grid, Stack, styled } from "#styled-system/jsx";
import { InputGroup } from "#components/InputGroup.tsx";
import { cx } from "#styled-system/css";
import { Tmp_pictures, Pictures, Report } from "@cr-vif/electric-client/frontend";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useLiveQuery } from "electric-sql/react";
import { get, set } from "idb-keyval";
import { useFormContext } from "react-hook-form";
import Badge from "@codegouvfr/react-dsfr/Badge";
import Button from "@codegouvfr/react-dsfr/Button";
import { css } from "#styled-system/css";
import { createModal } from "@codegouvfr/react-dsfr/Modal";
import { DrawingCanvas } from "./DrawingCanvas";
import { api } from "../../api";

const modal = createModal({
  id: "edit-picture",
  isOpenedByDefault: false,
});

export const UploadImage = ({ reportId }: { reportId: string }) => {
  const [statusMap, setStatusMap] = useState<Record<string, string>>({});
  const [selectedPicture, setSelectedPicture] = useState<{ id: string; url: string } | null>(null);
  const ref = useRef<HTMLInputElement>(null);

  const uploadImageMutation = useMutation(async (file: File) => {
    const picId = v4();

    try {
      const formData = new FormData();
      const buffer = await getArrayBufferFromBlob(file);

      formData.append("file", new Blob([buffer]), "file");
      formData.append("reportId", reportId);
      formData.append("pictureId", picId);

      await api.post("/api/upload/image", {
        body: formData,
        query: { reportId: reportId, id: picId },
      } as any);
    } catch {
      const picturesStore = getPicturesStore();
      const toUploadStore = getToUploadStore();

      const buffer = await getArrayBufferFromBlob(file);
      await set(picId, buffer, picturesStore);
      await set(picId, reportId, toUploadStore);

      await db.tmp_pictures.create({ data: { id: picId, reportId, createdAt: new Date() } });
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
      <modal.Component title="Editer la photo">
        {selectedPicture ? <DrawingCanvas imageUrl={selectedPicture.url} /> : null}
      </modal.Component>
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

  const idbStatusQuery = useQuery({
    queryKey: ["picture-status", picture.id],
    queryFn: async () => {
      const status = await get(picture.id, getUploadStatusStore());
      return status ?? null;
    },
    enabled: !status,
  });

  const finalStatus = picture.url ? "success" : status ?? idbStatusQuery.data ?? "uploading";

  const bgUrl = bgUrlQuery.data;

  return (
    <Stack>
      {/* <Badge severity={finalStatus === "uploading" ? }></Badge> */}
      <ReportStatus status={finalStatus as any} />
      <Flex
        style={bgUrl ? { backgroundImage: `url(${bgUrl})` } : { backgroundColor: "gray" }}
        flexDir="column"
        justifyContent="flex-end"
        w="180px"
        h="170px"
        backgroundPositionY="-20px"
        backgroundSize="cover"
      >
        <Flex alignItems="center" border="1px solid #DFDFDF" h="40px" bgColor="white">
          {/* <Box
            onClick={() => {
              setSelectedPicture({ id: picture.id, url: bgUrl! });
              modal.open();
            }}
            borderLeft="1px solid #DFDFDF"
          >
            <Button type="button" iconId="ri-pencil-fill" priority="tertiary no outline" />
          </Box> */}
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
