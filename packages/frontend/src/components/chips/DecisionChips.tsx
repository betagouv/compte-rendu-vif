import { useFormContext, useWatch } from "react-hook-form";
import type { Report } from "@cr-vif/electric-client/frontend";
import { ChipGroup, type ChipGroupOption } from "../Chip";
import { useChipOptions } from "../../features/chips/useChipOptions";

export const DecisionChips = () => {
  const form = useFormContext<Report>();

  const selected = useWatch({ control: form.control, name: "decision" });
  const value = selected ? [selected] : [];

  const chipOptions = useChipOptions("decision");
  const options: ChipGroupOption[] = (chipOptions ?? []).map((chip) => ({
    label: chip.value,
    key: chip.value,
  }));

  return (
    <ChipGroup
      options={options}
      value={value}
      onChange={(values) => form.setValue("decision", values?.[0])}
      label="Décision"
    />
  );
};
