import Input from "@codegouvfr/react-dsfr/Input";
import { css } from "#styled-system/css";
import { Control, useController, useFormContext, useWatch } from "react-hook-form";
import { Report } from "../db/AppSchema";
import { useIsFormDisabled } from "../features/DisabledContext";
import { useQuery } from "@tanstack/react-query";
import { searchAddress } from "../features/address";
import { useEffect, useState } from "react";
import { useDebounce } from "react-use";
import { Popover } from "./Popover";
import { styled } from "#styled-system/jsx";
import { Combobox } from "./Combobox";
import Button from "@codegouvfr/react-dsfr/Button";

export const SmartAddressInput = () => {
  const form = useFormContext<Report>();
  const isFormDisabled = useIsFormDisabled();

  const [isFrozen, setIsFrozen] = useState(true);

  const applicantAddress = useWatch({ control: form.control, name: "applicantAddress" });
  const [debouncedAddress, setDebouncedAddress] = useState(applicantAddress);

  useDebounce(() => setDebouncedAddress(applicantAddress), 500, [applicantAddress]);

  const addressQuery = useQuery({
    queryKey: ["address", debouncedAddress],
    queryFn: () => searchAddress(debouncedAddress!),
    enabled: !!debouncedAddress && !isFormDisabled && debouncedAddress.length > 4 && !isFrozen,
  });

  const suggestions = addressQuery.data;

  return (
    <styled.div mb="28px">
      <Combobox.Root
        disabled={isFormDisabled}
        selectionBehavior="replace"
        itemToString={(item) => (item as string) ?? ""}
        itemToValue={(item) => (item as string) ?? ""}
        items={suggestions ?? []}
        value={applicantAddress ? [applicantAddress.toString()] : undefined}
        inputValue={applicantAddress ?? ""}
        onInputValueChange={(e) => {
          form.setValue("applicantAddress", e.value);
          setIsFrozen(false);
        }}
        onValueChange={(e) => {
          form.setValue("applicantAddress", e.items?.[0] as string);
          setIsFrozen(true);
        }}
      >
        <Combobox.Control>
          <Combobox.Input asChild placeholder="Sélectionner un service instructeur">
            <ProxyInput disabled={isFormDisabled} />
          </Combobox.Input>
          {/* <Combobox.Trigger asChild top="unset !important" bottom="28px">
            <Button iconId="ri-arrow-down-line" aria-label="open" priority="tertiary no outline" size="small"></Button>
          </Combobox.Trigger> */}
        </Combobox.Control>
        <Combobox.Positioner>
          <Combobox.Content maxH="400px" overflow="auto">
            <Combobox.ItemGroup id="service-instructeur">
              {suggestions?.length
                ? suggestions.map((item: string) => (
                    <Combobox.Item key={item} item={item}>
                      <Combobox.ItemText>{item}</Combobox.ItemText>
                    </Combobox.Item>
                  ))
                : null}
            </Combobox.ItemGroup>
          </Combobox.Content>
        </Combobox.Positioner>
      </Combobox.Root>
    </styled.div>
  );
};

const ProxyInput = ({ disabled, ...props }: any) => {
  return <Input label="Adresse" disabled={disabled} nativeInputProps={{ ...props, autoComplete: "new-password" }} />;
};
