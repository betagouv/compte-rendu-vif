import { Stack } from "@mui/material";
import { useStateReportFormContext } from "../utils";
import { useWatch } from "react-hook-form";
import RadioButtons from "@codegouvfr/react-dsfr/RadioButtons";
import Checkbox from "@codegouvfr/react-dsfr/Checkbox";
import { Input } from "#components/MUIDsfr.tsx";
import { Divider } from "#components/ui/Divider.tsx";

export const ConstatGeneral = () => {
  const form = useStateReportFormContext();

  return (
    <Stack px="16px" pt="16px" mb="16px">
      <EtatGeneralRadioButtons />
      <ProportionsRadioButtons />
      <Input textArea label="Commentaires" nativeTextAreaProps={{ rows: 6, ...form.register("etat_commentaires") }} />

      <Divider mb="16px" />

      <Preconisations />
      <Input
        textArea
        label="Commentaires"
        nativeTextAreaProps={{ rows: 6, ...form.register("preconisations_commentaires") }}
      />
    </Stack>
  );
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
