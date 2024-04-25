import { useFormContext, useWatch } from "react-hook-form";
import type { Report } from "../../generated/client";
import { ChipGroup, type ChipGroupOption } from "../Chip";

export const DecisionChips = () => {
  const form = useFormContext<Report>();

  const selected = useWatch({ control: form.control, name: "decision" });
  const value = selected ? [selected] : [];

  const options: ChipGroupOption[] = [
    { label: "PSMV", key: "psmv" },
    {
      label: "Abord MH",
      key: "abord-mh",
    },
    {
      label: "MH inscrit",
      key: "mh-inscrit",
    },
  ];

  return (
    <ChipGroup
      options={options}
      value={value}
      onChange={(values) => form.setValue("decision", values?.[0])}
      label="Décision"
    />
  );
};
