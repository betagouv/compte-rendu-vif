import { useFormContext, useWatch } from "react-hook-form";
import { ChipGroup, type ChipGroupOption } from "../Chip";
import { useChipOptions } from "../../features/chips/useChipOptions";
import { Report } from "../../db/AppSchema";
import { BoxProps } from "@mui/material";

export const SpaceTypeChips = (props: BoxProps & { disabled?: boolean }) => {
  const form = useFormContext<Report>();

  const selected = useWatch({ control: form.control, name: "projectSpaceType" })?.split(",") ?? [];

  const chipOptions = useChipOptions("type-espace");
  const options = (chipOptions ?? []).map((chip) => ({
    label: chip.value,
    key: chip.value,
  }));

  return (
    <ChipGroup
      options={options as any as ChipGroupOption[]}
      value={selected}
      {...props}
      onChange={(values) => form.setValue("projectSpaceType", values.join(","))}
      label="Type d'espace protégé"
      clauseId="type-espace"
    />
  );
};
