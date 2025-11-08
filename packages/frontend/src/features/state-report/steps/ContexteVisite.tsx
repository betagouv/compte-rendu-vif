import { Stack } from "@mui/material";
import { useStateReportFormContext } from "../utils";
import { Input } from "#components/MUIDsfr.tsx";
import { InputGroup } from "#components/InputGroup.tsx";
import { RadioButtons } from "@codegouvfr/react-dsfr/RadioButtons";
import { UseFormReturn, useWatch } from "react-hook-form";
import { Checkbox } from "@codegouvfr/react-dsfr/Checkbox";
import { ContentBlock } from "./MonumentHistorique";
import { Divider } from "#components/ui/Divider.tsx";
import { useEffect, useRef } from "react";
import { format, parse } from "date-fns";
import { Flex } from "#components/ui/Flex.tsx";

export const ContexteVisite = () => {
  const form = useStateReportFormContext();

  return (
    <Stack px="16px" pt="16px" mb="16px">
      <NatureVisiteRadioButtons />
      <BilanQuinquennalRadioButtons />
      <Divider mb="16px" />
      <DateInput form={form} name="date_visite" label="Date de la visite" />
      <Input
        label="Rédacteur du constat"
        nativeInputProps={{
          ...form.register("redacted_by"),
        }}
      />
      <Divider mb="16px" />
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

const DateInput = ({ form, name, label }: { form: UseFormReturn<any>; name: string; label: string }) => {
  const rawValue = useWatch({ control: form.control, name });
  const dateString = rawValue ? format(new Date(rawValue), "yyyy-MM-dd") : null;
  const currentValueRef = useRef(dateString);

  return (
    <Input
      label={label}
      nativeInputProps={{
        type: "date",
        value: currentValueRef.current || "",
        onChange: (e) => {
          currentValueRef.current = e.target.value;
          const date = parse(e.target.value, "yyyy-MM-dd", new Date());
          const isDateOk = !!e.target.value && !Number.isNaN(date.getTime());
          if (!isDateOk) {
            form.setValue(name, null);
            return;
          }
          form.setValue(name, date.toISOString());
        },
      }}
    />
  );
};

const NatureVisiteRadioButtons = () => {
  const form = useStateReportFormContext();

  const value = useWatch({ control: form.control, name: "nature_visite" });

  const options = ["Complète", "Partielle (préciser)"].map((label) => ({
    label,
    nativeInputProps: {
      checked: value === label.toLowerCase(),
      onChange: () => form.setValue("nature_visite", label.toLowerCase()),
    },
  }));

  return (
    <Stack gap={0} mb="16px">
      <RadioButtons legend="Nature de la visite" options={options} style={{ marginBottom: 0 }} />
      {value === "partielle (préciser)" ? (
        <Input label={null} nativeInputProps={{ ...form.register("visite_partielle_details") }} />
      ) : null}
    </Stack>
  );
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

  if (nature !== "Partielle (préciser)") {
    return null;
  }

  return (
    <RadioButtons
      legend="Ce constat doit-il être pris en compte pour le bilan quinquennal de l'édifice ?"
      options={options}
    />
  );
};
