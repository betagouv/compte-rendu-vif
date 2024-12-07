import { useFormContext, useWatch } from "react-hook-form";
import { ChipGroup, type ChipGroupOption } from "../Chip";
import { FlexProps } from "#styled-system/jsx";
import { useChipOptions } from "../../features/chips/useChipOptions";
import { Report } from "../../db/AppSchema";

export const SpaceTypeChips = (props: FlexProps & { disabled?: boolean }) => {
  const form = useFormContext<Report>();

  const selected = useWatch({ control: form.control, name: "projectSpaceType" })?.split(",") ?? [];

  const chipOptions = useChipOptions("type-espace");
  const options: ChipGroupOption[] = (chipOptions ?? []).map((chip) => ({
    label: chip.value,
    key: chip.value,
  }));

  return (
    <ChipGroup
      options={options}
      value={selected}
      {...props}
      onChange={(values) => form.setValue("projectSpaceType", values.join(","))}
      label="Type d'espace protégé"
    />
  );
};
