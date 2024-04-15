import { useFormContext, useWatch } from "react-hook-form";
import type { Report } from "../../generated/client/prismaClient";
import { ChipGroup, type ChipGroupOption } from "../Chip";

export const SpaceTypeChips = () => {
  const form = useFormContext<Report>();

  const selected = useWatch({ control: form.control, name: "project_space_type" })?.split(",") ?? [];

  const spaceTypes: ChipGroupOption[] = [
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
      isMulti
      canBeEmpty
      options={spaceTypes}
      value={selected}
      onChange={(values) => void console.log(values) || form.setValue("project_space_type", values.join(","))}
      label="Type d'espace"
    />
  );
};
