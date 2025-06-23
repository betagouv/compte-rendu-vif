import { useFormContext, useWatch } from "react-hook-form";
import { ChipGroup, type ChipGroupOption } from "../Chip";
import { FlexProps } from "#styled-system/jsx";
import { useChipOptions } from "../../features/chips/useChipOptions";
import { Report } from "../../db/AppSchema";

export const ContactChips = (props: FlexProps & { disabled?: boolean }) => {
  const form = useFormContext<Report>();

  const selected = useWatch({ control: form.control, name: "contacts" })?.split(",") ?? [];

  const chipOptions = useChipOptions("contacts-utiles");
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
      onChange={(values) => form.setValue("contacts", values.join(","))}
      label="Contacts utiles"
      clauseId="contacts-utiles"
    />
  );
};
