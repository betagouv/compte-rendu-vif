import { useFormContext, useWatch } from "react-hook-form";
import type { Report } from "@cr-vif/electric-client/frontend";
import { ChipGroup, type ChipGroupOption } from "../Chip";
import { FlexProps } from "#styled-system/jsx";
import { useChipOptions } from "../../features/chips/useChipOptions";

export const FurtherInfoChips = (props: FlexProps & { disabled?: boolean }) => {
  const form = useFormContext<Report>();

  const selected = useWatch({ control: form.control, name: "furtherInformation" })?.split(",") ?? [];

  const chipOptions = useChipOptions("bonnes-pratiques");
  const options: ChipGroupOption[] = (chipOptions ?? []).map((chip) => ({
    label: chip.value,
    key: chip.value,
  }));

  return (
    <ChipGroup
      isMulti
      options={options}
      value={selected}
      {...props}
      onChange={(values) => form.setValue("furtherInformation", values.join(","))}
      label="Pour aller plus loin"
    />
  );
};
