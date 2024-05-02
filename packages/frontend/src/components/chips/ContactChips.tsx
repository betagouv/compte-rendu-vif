import { useFormContext, useWatch } from "react-hook-form";
import type { Report } from "@cr-vif/electric-client/frontend";
import { ChipGroup, type ChipGroupOption } from "../Chip";
import { FlexProps } from "#styled-system/jsx";

export const ContactChips = (props: FlexProps) => {
  const form = useFormContext<Report>();

  const selected = useWatch({ control: form.control, name: "contacts" })?.split(",") ?? [];

  const contactOptions: ChipGroupOption[] = [
    { label: "Contact 1", key: "contact1" },
    {
      label: "Contact 2",
      key: "contact2",
    },
    {
      label: "Contact 3",
      key: "contact3",
    },
  ];

  return (
    <ChipGroup
      isMulti
      options={contactOptions}
      value={selected}
      {...props}
      onChange={(values) => form.setValue("contacts", values.join(","))}
      label="Contacts"
    />
  );
};
