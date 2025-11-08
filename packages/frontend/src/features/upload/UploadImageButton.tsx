import { Button, Center } from "#components/MUIDsfr.tsx";
import { Flex } from "#components/ui/Flex.tsx";
import { Box, BoxProps } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ChangeEvent, ComponentProps, RefObject, useRef, useState } from "react";
import { db } from "../../db/db";
import { ImageCanvas } from "./DrawingCanvas";

type UploadImageButtonProps = {
  addImage: ({ files }: { files: File[] }) => Promise<void>;
  multiple?: boolean;
};

export const UploadImageButton = ({ addImage, multiple }: UploadImageButtonProps) => {
  const uploadImageMutation = useMutation(async ({ files }: { files: File[] }) => {
    await addImage({ files });
    ref.current!.value = "";
  });

  const onChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    await uploadImageMutation.mutateAsync({ files: Array.from(files) });
  };

  const ref = useRef<HTMLInputElement | null>(null);
  return (
    <>
      <Button
        type="button"
        iconId="fr-icon-image-add-fill"
        priority="secondary"
        nativeButtonProps={{
          type: "button",
          onClick: () => ref.current?.click(),
        }}
      >
        Ajouter photo
      </Button>
      <input
        ref={ref as any}
        type="file"
        accept="image/*"
        onChange={onChange}
        multiple={multiple}
        style={{ display: "none" }}
      />
    </>
  );
};

export const UploadImageWithEditModal = ({
  addImage,
  selectedImage,
  onClose,
  hideButton,
  imageTable,
  multiple,
}: UploadImageButtonProps & {
  selectedImage: { id: string; url: string } | null;
  onClose: () => void;
  hideButton?: boolean;
  imageTable: string;
}) => {
  return (
    <Flex>
      {selectedImage ? (
        <UploadImageModal selectedImage={selectedImage} onClose={onClose} imageTable={imageTable} />
      ) : null}
      {!hideButton ? <UploadImageButton addImage={addImage} multiple={multiple} /> : null}
    </Flex>
  );
};

export const UploadImageModal = ({
  selectedImage,
  onClose,
  imageTable,
}: {
  selectedImage: { id: string; url: string };
  onClose: () => void;
  imageTable?: string;
}) => {
  const linesQuery = useQuery({
    queryKey: ["lines", selectedImage?.id],
    queryFn: async () => {
      const linesQuery = await db
        .selectFrom("picture_lines")
        .where("attachmentId", "=", selectedImage!.id)
        .selectAll()
        .execute();

      return JSON.parse(linesQuery?.[0]?.lines ?? "[]");
    },
    enabled: !!selectedImage,
  });

  const containerRef = useRef<HTMLDivElement>(null);
  return (
    <Box
      display={selectedImage ? "initial" : "none"}
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
          {selectedImage ? (
            <ImageCanvas
              imageTable={imageTable}
              closeModal={() => onClose()}
              pictureId={selectedImage.id}
              url={selectedImage.url}
              containerRef={containerRef}
              lines={linesQuery.data}
            />
          ) : null}
        </Box>
      </Center>
    </Box>
  );
};
