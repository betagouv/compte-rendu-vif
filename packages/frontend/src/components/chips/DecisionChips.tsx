import { useFormContext, useWatch } from "react-hook-form";
import { ChipGroup, type ChipGroupOption } from "../Chip";
import { useChipOptions } from "../../features/chips/useChipOptions";
import { Report } from "../../db/AppSchema";

export const DecisionChips = ({ disabled }: { disabled?: boolean }) => {
  const form = useFormContext<Reportt>();

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
      disabled={disabled}
      onChange={(values) => form.setValue("decision", values?.[0])}
      label="Décision"
    />
  );
};
