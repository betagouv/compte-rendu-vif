import { useFormContext, useWatch } from "react-hook-form";
import type { Report } from "@cr-vif/electric-client/frontend";
import { ChipGroup, type ChipGroupOption } from "../Chip";

export const SpaceTypeChips = () => {
  const form = useFormContext<Report>();

  const selected = useWatch({ control: form.control, name: "projectSpaceType" })?.split(",") ?? [];

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
      options={spaceTypes}
      value={selected}
      onChange={(values) => form.setValue("projectSpaceType", values.join(","))}
      label="Type d'espace"
    />
  );
};
