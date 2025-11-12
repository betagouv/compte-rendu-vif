import { Box, Stack, Typography } from "@mui/material";
import { StateReportFormType, useStateReportFormContext } from "../utils";
import { UseFormReturn, useWatch } from "react-hook-form";
import RadioButtons from "@codegouvfr/react-dsfr/RadioButtons";
import Checkbox from "@codegouvfr/react-dsfr/Checkbox";
import { Input } from "#components/MUIDsfr.tsx";
import { Divider } from "#components/ui/Divider.tsx";
import { useMutation } from "@tanstack/react-query";
import { getRouteApi } from "@tanstack/react-router";
import { v7 } from "uuid";
import { PictureThumbnail, processImage } from "../../upload/UploadReportImage";
import { attachmentQueue, attachmentStorage, db } from "../../../db/db";
import { useLiveUser } from "../../../contexts/AuthContext";
import { UploadImageWithEditModal } from "../../upload/UploadImageButton";
import { Flex } from "#components/ui/Flex.tsx";
import { StateReport } from "../../../db/AppSchema";
import { useState } from "react";

const routeApi = getRouteApi("/constat/$constatId");

export const ConstatGeneral = () => {
  const form = useStateReportFormContext();

  return (
    <Stack px="16px" pt="16px" mb="16px">
      <EtatGeneralRadioButtons />
      <ProportionsRadioButtons />
      <Input textArea label="Commentaires" nativeTextAreaProps={{ rows: 6, ...form.register("etat_commentaires") }} />

      <Divider mb="16px" />
      <EtatGeneralImages />
      <Divider my="16px" />
      <Preconisations />
      <Input
        textArea
        label="Commentaires"
        nativeTextAreaProps={{ rows: 6, ...form.register("preconisations_commentaires") }}
      />
    </Stack>
  );
};

const EtatGeneralImages = () => {
  const form = useStateReportFormContext();
  const { constatId } = routeApi.useParams();
  const [selectedPicture, setSelectedPicture] = useState<{ id: string; url: string } | null>(null);

  const onEdit = (props: { id: string; url: string }) => {
    setSelectedPicture(props);
  };

  const onClose = () => {
    setSelectedPicture(null);
  };

  const onDelete = async (props: { id: string; property: string }) => {
    const { id, property } = props;
    await attachmentStorage.deleteFile(id);
    await db
      .updateTable("state_report")
      .set({ [property]: null })
      .where("id", "=", constatId)
      .execute();
  };

  return (
    <Flex width="100%" flexWrap="wrap" gap={{ xs: "16px", lg: "0" }}>
      <Box flex="1">
        <Typography>Plan de situation</Typography>

        <SingleUploadImageWithPreview
          constatId={constatId}
          label=""
          property="plan_situation"
          form={form}
          onEdit={onEdit}
          onDelete={onDelete}
          selectedImage={selectedPicture}
          onClose={onClose}
        />
      </Box>
      <Box flex="1">
        <Typography>Plan de l'édifice</Typography>

        <SingleUploadImageWithPreview
          constatId={constatId}
          label=""
          property="plan_edifice"
          form={form}
          onEdit={onEdit}
          onDelete={onDelete}
          selectedImage={selectedPicture}
          onClose={onClose}
        />
      </Box>
      <Box flex="1" mx={{ xs: "0", lg: "16px" }}>
        <Typography>Vues générales de l'édifice</Typography>

        <SingleUploadImageWithPreview
          constatId={constatId}
          label=""
          property="vue_generale"
          form={form}
          onEdit={onEdit}
          onDelete={onDelete}
          selectedImage={selectedPicture}
          onClose={onClose}
        />
      </Box>
    </Flex>
  );
};

const SingleUploadImageWithPreview = ({
  constatId,
  label,
  property,
  form,
  selectedImage,
  onClose,
  onEdit,
  onDelete,
}: {
  constatId: string;
  label: string;
  property: keyof StateReport;
  form: UseFormReturn<StateReportFormType>;
  selectedImage: { id: string; url: string } | null;
  onClose: () => void;
  onEdit: (props: { id: string; url: string }) => void;
  onDelete: (props: { id: string; property: string }) => void;
}) => {
  const [value] = useWatch({ control: form.control, name: [property] });
  const addMutation = useUpdateImageMutation({
    constatId,
    onSuccess: async (attachmentId: string) => {
      await db
        .updateTable("state_report")
        .set({ [property]: attachmentId })
        .where("id", "=", constatId)
        .execute();
    },
  });

  return (
    <Box width="100%">
      <UploadImageWithEditModal
        hideButton={!!value}
        addImage={addMutation.mutateAsync}
        selectedImage={selectedImage}
        onClose={onClose}
        imageTable="state_report_attachment"
      />
      {value ? (
        <Box mt="8px" width="100%">
          <PictureThumbnail
            label={"label"}
            picture={{ id: value as string }}
            onEdit={onEdit}
            onDelete={(props: { id: string }) => onDelete({ id: props.id, property })}
          />
        </Box>
      ) : null}
    </Box>
  );
};

const useUpdateImageMutation = ({
  constatId,
  onSuccess,
}: {
  constatId: string;
  onSuccess: (attachmentId: string) => void | Promise<void>;
}) => {
  const user = useLiveUser();
  return useMutation({
    mutationFn: async ({ files }: { files: File[] }) => {
      for (const file of files) {
        const attachmentId = `${constatId}/images/${v7()}.jpg`;
        const buffer = await processImage(file);

        await attachmentQueue.saveAttachment({
          attachmentId: attachmentId,
          buffer,
          mediaType: "image/jpeg",
        });

        await db
          .insertInto("state_report_attachment")
          .values({
            id: attachmentId,
            attachment_id: attachmentId,
            state_report_id: constatId,
            created_at: new Date().toISOString(),
            is_deprecated: 0,
            service_id: user!.service_id,
          })
          .execute();

        await onSuccess(attachmentId);
      }
    },
  });
};

export const EtatGeneralRadioButtons = () => {
  const form = useStateReportFormContext();
  const value = useWatch({ control: form.control, name: "etat_general" });
  const options = ["Bon", "Moyen", "Mauvais", "Péril"].map((label) => ({
    label,
    nativeInputProps: {
      checked: value === label,
      onChange: () => form.setValue("etat_general", label),
    },
  }));

  return <RadioButtons legend="État général" options={options} />;
};

const ProportionsRadioButtons = () => {
  const form = useStateReportFormContext();
  const value = useWatch({ control: form.control, name: "proportion_dans_cet_etat" });

  const options = ["50%", "60%", "70%", "80%", "90%", "100%"].map((label) => ({
    label,
    nativeInputProps: {
      checked: value === label,
      onChange: () => form.setValue("proportion_dans_cet_etat", label),
    },
  }));

  return <RadioButtons legend="Proportion dans cet état" options={options} />;
};

const Preconisations = () => {
  const form = useStateReportFormContext();
  const value = useWatch({ control: form.control, name: "preconisations" });

  const selected = value ? value.split(",") : [];

  const options = [
    "Étude diagnostique",
    "Travaux d'entretien",
    "Travaux de réparation",
    "Travaux de restauration",
    "Mesures d'urgence",
  ].map((label) => ({
    label,
    nativeInputProps: {
      checked: selected.includes(label),
      onChange: () => {
        if (selected.includes(label)) {
          form.setValue("preconisations", selected.filter((item) => item !== label).join(","));
        } else {
          form.setValue("preconisations", [...selected, label].join(","));
        }
      },
    },
  }));
  return (
    <Stack>
      <Checkbox legend={"Préconisations"} options={options} />
    </Stack>
  );
};
