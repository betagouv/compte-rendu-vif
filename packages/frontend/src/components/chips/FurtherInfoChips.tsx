import { useFormContext, useWatch } from "react-hook-form";
import { ChipGroup, type ChipGroupOption } from "../Chip";
import { useChipOptions } from "../../features/chips/useChipOptions";
import { Report } from "../../db/AppSchema";
import { BoxProps } from "@mui/material";

export const FurtherInfoChips = (props: BoxProps & { disabled?: boolean }) => {
  const form = useFormContext<Report>();

  const selected = useWatch({ control: form.control, name: "furtherInformation" })?.split(",") ?? [];

  const chipOptions = useChipOptions("bonnes-pratiques");
  const options = (chipOptions ?? []).map((chip) => ({
    label: chip.value,
    key: chip.value,
  }));

  return (
    <ChipGroup
      isMulti
      options={options as ChipGroupOption[]}
      value={selected}
      {...props}
      onChange={(values) => form.setValue("furtherInformation", values.join(","))}
      label="Bonnes pratiques"
      clauseId="bonnes-pratiques"
    />
  );
};
