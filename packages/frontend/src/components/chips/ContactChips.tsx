import { useFormContext, useWatch } from "react-hook-form";
import type { Report } from "../../generated/client";
import { ChipGroup, type ChipGroupOption } from "../Chip";

export const ContactChips = () => {
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
      onChange={(values) => form.setValue("contacts", values.join(","))}
      label="Contacts"
    />
  );
};
