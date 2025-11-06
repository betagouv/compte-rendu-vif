import { Stack } from "@mui/material";
import { useStateReportFormContext } from "../utils";
import { Input } from "#components/MUIDsfr.tsx";
import { InputGroup } from "#components/InputGroup.tsx";
import { RadioButtons } from "@codegouvfr/react-dsfr/RadioButtons";
import { useWatch } from "react-hook-form";
import { Checkbox } from "@codegouvfr/react-dsfr/Checkbox";
import { ContentBlock } from "./MonumentHistorique";
import { Divider } from "#components/ui/Divider.tsx";
import { useEffect } from "react";

export const ContexteVisite = () => {
  const form = useStateReportFormContext();

  return (
    <Stack px="16px" pt="16px">
      <NatureVisiteRadioButtons />
      <BilanQuinquennalRadioButtons />
      <Divider />
      <Input
        label="Date de la visite"
        nativeInputProps={{
          type: "date",
          ...form.register("date_visite"),
        }}
      />
      <Input
        label="Rédacteur du constat"
        nativeInputProps={{
          ...form.register("redacted_by"),
        }}
      />
      <Divider />
      <Input
        label="Propriétaire"
        nativeInputProps={{
          ...form.register("proprietaire"),
        }}
      />
      <Input
        label="Courriel du propriétaire"
        nativeInputProps={{
          ...form.register("proprietaire_email"),
        }}
      />
      <Input
        label="Représentant"
        nativeInputProps={{
          ...form.register("proprietaire_representant"),
        }}
      />
      <Input
        label="Courriel du représentant"
        nativeInputProps={{
          ...form.register("proprietaire_representant_email"),
        }}
      />
    </Stack>
  );
};

/**
 * 
 * 
      <ProportionsRadioButtons />
      <Input textArea label="Commentaires" nativeTextAreaProps={{ rows: 6, ...form.register("etat_commentaires") }} />

      <Divider mb="16px" />

      <Preconisations />
      <Input
        textArea
        label="Commentaires"
        nativeTextAreaProps={{ rows: 6, ...form.register("preconisations_commentaires") }}
      />
 */

const NatureVisiteRadioButtons = () => {
  const form = useStateReportFormContext();

  const value = useWatch({ control: form.control, name: "nature_visite" });

  const options = ["Complète", "Partielle"].map((label) => ({
    label,
    nativeInputProps: {
      checked: value === label.toLowerCase(),
      onChange: () => form.setValue("nature_visite", label.toLowerCase()),
    },
  }));

  return <RadioButtons legend="Nature de la visite" options={options} />;
};

const BilanQuinquennalRadioButtons = () => {
  const form = useStateReportFormContext();
  const value = useWatch({ control: form.control, name: "bilan_quinquennal" });
  const nature = useWatch({ control: form.control, name: "nature_visite" });

  const options = ["Oui", "Non"].map((label) => ({
    label,
    nativeInputProps: {
      checked: value === label,
      onChange: () => form.setValue("bilan_quinquennal", label),
    },
  }));

  if (nature === "complète") {
    return null;
  }

  return (
    <RadioButtons
      legend="Ce constat doit-il être pris en compte pour le bilan quiquennal de l'édifice"
      options={options}
    />
  );
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
