import { useFormContext, useWatch } from "react-hook-form";
import type { Report } from "@cr-vif/electric-client/frontend";
import { ChipGroup, type ChipGroupOption } from "../Chip";

export const FurtherInfoChips = () => {
  const form = useFormContext<Report>();

  const selected = useWatch({ control: form.control, name: "furtherInformation" })?.split(",") ?? [];

  const furtherInfoOptions: ChipGroupOption[] = [
    { label: "Aller plus loin 1", key: "furtherInfo1" },
    {
      label: "Aller plus loin 2",
      key: "furtherInfo2",
    },
    {
      label: "Aller plus loin 3",
      key: "furtherInfo3",
    },
  ];

  return (
    <ChipGroup
      isMulti
      options={furtherInfoOptions}
      value={selected}
      onChange={(values) => form.setValue("furtherInformation", values.join(","))}
      label="Pour aller plus loin"
    />
  );
};
