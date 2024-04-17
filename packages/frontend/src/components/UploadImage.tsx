import { Upload } from "@codegouvfr/react-dsfr/Upload";
import { useFormContext, useWatch } from "react-hook-form";
import type { Report } from "../generated/client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getImageFromIdb } from "../db";
import { useRef } from "react";
import { Flex, styled } from "#styled-system/jsx";
import { api } from "../api";

export const UploadImage = () => {
  const form = useFormContext<Report>();

  const inputRef = useRef<HTMLInputElement>(null);

  const imagesQuery = useQuery({
    queryKey: ["images", form.getValues().id],
    queryFn: async () => {
      const images = await getImageFromIdb(form.getValues().id);
      return images as string[];
    },
  });

  console.log(imagesQuery);

  const storeImageMutation = useMutation(async (image: File) => {
    const formData = new FormData();
    formData.append("image", image);

    return await api.post("/api/upload-image", { body: formData, headers: { "Content-Disposition": formData } } as any);
  });

  return (
    <>
      <Upload
        ref={inputRef}
        nativeInputProps={{
          onChange: (e) => {
            storeImageMutation.mutate(e.target.files![0]);
          },
        }}
      />
      <Flex w="100%" flexWrap="wrap">
        {imagesQuery.data?.map((image, index) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
          <styled.img key={index} src={image} alt={`Téléversée ${index + 1}`} maxWidth="400px" />
        ))}
      </Flex>
    </>
  );
};
