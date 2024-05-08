import { Combobox } from "#components/Combobox";
import Button from "@codegouvfr/react-dsfr/Button";
import Input from "@codegouvfr/react-dsfr/Input";
import { forwardRef, useState } from "react";
import serviceInstructeurs from "../serviceInstructeur.json";
import { useFormContext, useWatch } from "react-hook-form";
import { Report } from "@cr-vif/electric-client/frontend";

export const ServiceInstructeurSelect = () => {
  const form = useFormContext<Report>();
  const [items, setItems] = useState(serviceInstructeurs);

  const filterItems = ({ value }: { value: string }) => {
    const filteredItems = serviceInstructeurs.filter((item) =>
      item["abrégé"].toLowerCase().includes(value.toLowerCase()),
    );

    setItems(filteredItems);
  };

  const selectItem = (item: ServiceInstructeur) => {
    form.setValue("serviceInstructeur", item.tiers);
  };

  const value = useWatch({ control: form.control, name: "serviceInstructeur" });

  return (
    <Combobox.Root
      selectionBehavior="replace"
      itemToString={(item) => (item as ServiceInstructeur)?.["abrégé"] ?? ""}
      itemToValue={(item) => (item as ServiceInstructeur)?.tiers.toString() ?? ""}
      items={items}
      value={value ? [value.toString()] : undefined}
      onInputValueChange={filterItems}
      onValueChange={(e) => selectItem(e.items?.[0] as ServiceInstructeur)}
    >
      <Combobox.Control>
        <Combobox.Input asChild placeholder="Sélectionner un service instructeur">
          <A />
        </Combobox.Input>
        <Combobox.Trigger asChild top="unset !important" bottom="28px">
          {/* @ts-expect-error */}
          <Button iconId="ri-arrow-down-line" aria-label="open" priority="tertiary no outline" size="small"></Button>
        </Combobox.Trigger>
      </Combobox.Control>
      <Combobox.Positioner>
        <Combobox.Content maxH="400px" overflow="auto">
          <Combobox.ItemGroup id="service-instructeur">
            {items.map((item) => (
              <Combobox.Item key={item.tiers} item={item}>
                <Combobox.ItemText>{item["abrégé"]}</Combobox.ItemText>
                <Combobox.ItemIndicator>✓</Combobox.ItemIndicator>
              </Combobox.Item>
            ))}
          </Combobox.ItemGroup>
        </Combobox.Content>
      </Combobox.Positioner>
    </Combobox.Root>
  );
};

const A = forwardRef((props, ref: any) => {
  return <Input ref={ref} label="Service instructeur*" nativeInputProps={props} />;
});

type ServiceInstructeur = (typeof serviceInstructeurs)[number];
