import { Box, BoxProps, Stack, Typography } from "@mui/material";
import { StateReportFormType, useStateReportFormContext } from "../utils";
import { UseFormReturn, useWatch } from "react-hook-form";
import RadioButtons from "@codegouvfr/react-dsfr/RadioButtons";
import Checkbox from "@codegouvfr/react-dsfr/Checkbox";
import { Button, Input } from "#components/MUIDsfr.tsx";
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
import { useSpeechToTextV2 } from "../../audio-record/SpeechRecorder.hook";
import { useIsDesktop } from "../../../hooks/useIsDesktop";
import { fr } from "@codegouvfr/react-dsfr";

const routeApi = getRouteApi("/constat/$constatId");

export const ConstatGeneral = () => {
  const form = useStateReportFormContext();

  return (
    <Stack px="16px" pl={{ xs: "16px", lg: "64px" }} pt={{ xs: "16px", lg: "44px" }} mb="16px">
      <Typography variant="h6" mb="32px" display={{ xs: "none", lg: "block" }}>
        Constat général
      </Typography>
      <Typography variant="caption" color={fr.colors.decisions.text.mention.grey.default} mb="24px">
        Les champs avec le symbole * sont obligatoires
      </Typography>
      <EtatGeneralRadioButtons />
      <ProportionsRadioButtons />
      <StateReportTextAreaWithSpeechToText label="Commentaire" name="etat_commentaires" mb="40px" />
      <Divider mb={{ xs: "24px", lg: "32px" }} />
      <EtatGeneralImages />
      <Divider my={{ xs: "24px", lg: "32px" }} />
      <Preconisations />
      <StateReportTextAreaWithSpeechToText label="Commentaire" name="preconisations_commentaires" />
    </Stack>
  );
};

const StateReportTextAreaWithSpeechToText = ({
  label,
  name,
  ...props
}: { label: string; name: keyof StateReportFormType } & BoxProps) => {
  const form = useStateReportFormContext();
  const value = useWatch({ control: form.control, name: name }) ?? "";
  const setValue = (val: string) => form.setValue(name, val);

  const { isRecording, transcript, toggle } = useSpeechToTextV2({
    onEnd: (text) => {
      const currentValue = form.getValues(name) || "";
      setValue(currentValue + " " + text);
    },
  });

  const isIdleProps = form.register(name);
  const isListeningProps = {
    ...isIdleProps,
    value: value + " " + transcript,
    onChange: () => {},
  };

  const textAreaProps = isRecording ? isListeningProps : isIdleProps;
  return (
    <Flex flexDirection="column" {...props}>
      <Input
        sx={{ mb: "16px !important", "& > textarea": { mt: "0 !important" } }}
        disabled={isRecording}
        label={label}
        textArea
        nativeTextAreaProps={{
          ...textAreaProps,
          rows: 5,
        }}
      />
      <Button
        type="button"
        priority={isRecording ? "primary" : "tertiary"}
        iconId="ri-mic-fill"
        onClick={() => toggle()}
      >
        {isRecording ? <>En cours</> : <>Dicter</>}
      </Button>
    </Flex>
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
    <Flex width="100%" flexWrap="wrap" gap={{ xs: "20px", lg: "16px" }} flexDirection={{ xs: "column", lg: "row" }}>
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
      <Box flex="1">
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
    <Box
      width="100%"
      sx={{
        button: {
          width: { xs: "100% !important", lg: "fit-content" },
          justifyContent: { xs: "center !important", lg: "unset" },
        },
      }}
    >
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

  const isDesktop = useIsDesktop();

  const value = useWatch({ control: form.control, name: "etat_general" });
  const options = ["Bon", "Moyen", "Mauvais", "Péril"].map((label) => ({
    label,
    nativeInputProps: {
      checked: value === label,
      onChange: () => form.setValue("etat_general", label),
    },
  }));

  return <RadioButtons orientation={isDesktop ? "horizontal" : "vertical"} legend="État général" options={options} />;
};

const ProportionsRadioButtons = () => {
  const form = useStateReportFormContext();
  const value = useWatch({ control: form.control, name: "proportion_dans_cet_etat" });

  const isDesktop = useIsDesktop();

  const options = ["50%", "60%", "70%", "80%", "90%", "100%"].map((label) => ({
    label,
    nativeInputProps: {
      checked: value === label,
      onChange: () => form.setValue("proportion_dans_cet_etat", label),
    },
  }));

  return (
    <RadioButtons
      orientation={isDesktop ? "horizontal" : "vertical"}
      legend="Proportion dans cet état"
      options={options}
    />
  );
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
