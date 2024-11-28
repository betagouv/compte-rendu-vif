import { Combobox } from "#components/Combobox";
import Button from "@codegouvfr/react-dsfr/Button";
import Input from "@codegouvfr/react-dsfr/Input";
import { useState } from "react";
// import { serviceInstructeurs } from "@cr-vif/pdf";
import { useFormContext, useWatch } from "react-hook-form";
import { useUser } from "../contexts/AuthContext";
import { db, useDbQuery } from "../db/db";
import { Report } from "../db/AppSchema";

export const ServiceInstructeurSelect = ({ disabled }: { disabled?: boolean }) => {
  const form = useFormContext<Report>();
  const user = useUser()!;
  const [inputValue, setInputValue] = useState("");

  const serviceInstructeursQuery = useDbQuery(db.selectFrom("service_instructeurs").selectAll());

  // const serviceInstructeursQuery = useLiveQuery(
  //   db.service_instructeurs.liveMany({
  //     where: {
  //       udap_id: user.udap_id,
  //     },
  //   }),
  // );

  const rawItems = serviceInstructeursQuery.data ?? [];

  const items = rawItems.filter((item) => item.short_name?.toLowerCase().includes(inputValue.toLowerCase()));

  const selectItem = (item: ServiceInstructeur | null) => {
    form.setValue("serviceInstructeur", item?.id || null);
  };

  const value = useWatch({ control: form.control, name: "serviceInstructeur" });

  return (
    <Combobox.Root
      disabled={disabled}
      selectionBehavior="replace"
      itemToString={(item) => (item as ServiceInstructeur)?.short_name ?? ""}
      itemToValue={(item) => (item as ServiceInstructeur)?.id.toString() ?? ""}
      items={items}
      value={value ? [value.toString()] : undefined}
      inputValue={value ? items.find((item) => item.id === value)?.short_name : inputValue}
      onInputValueChange={(e) => {
        if (value) selectItem(null);
        setInputValue(e.value);
      }}
      onValueChange={(e) => selectItem(e.items?.[0] as ServiceInstructeur)}
    >
      <Combobox.Control>
        <Combobox.Input asChild placeholder="Sélectionner un service instructeur">
          <ProxyInput />
        </Combobox.Input>
        <Combobox.Trigger asChild top="unset !important" bottom="28px">
          {/* @ts-expect-error */}
          <Button iconId="ri-arrow-down-line" aria-label="open" priority="tertiary no outline" size="small"></Button>
        </Combobox.Trigger>
      </Combobox.Control>
      <Combobox.Positioner>
        <Combobox.Content maxH="400px" overflow="auto">
          <Combobox.ItemGroup id="service-instructeur">
            {items?.length ? (
              items.map((item) => (
                <Combobox.Item key={item.id} item={item}>
                  <Combobox.ItemText>{item.short_name}</Combobox.ItemText>
                </Combobox.Item>
              ))
            ) : (
              <Combobox.Item item={null}>
                <Combobox.ItemText>Aucun résultat</Combobox.ItemText>
              </Combobox.Item>
            )}
          </Combobox.ItemGroup>
        </Combobox.Content>
      </Combobox.Positioner>
    </Combobox.Root>
  );
};

const ProxyInput = (props: any) => {
  return <Input label="Service instructeur" nativeInputProps={props} />;
};
