import { css } from "#styled-system/css";
import { Flex, Stack, styled } from "#styled-system/jsx";
import { fr } from "@codegouvfr/react-dsfr";
import Badge from "@codegouvfr/react-dsfr/Badge";
import Input from "@codegouvfr/react-dsfr/Input";
import { useQuery } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { useDebounce } from "react-use";
import { Report } from "../db/AppSchema";
import { AddressResult, searchAddress } from "../features/address";
import { useIsFormDisabled } from "../features/DisabledContext";
import { Combobox } from "./Combobox";

export const SmartAddressInput = () => {
  const form = useFormContext<Report>();
  const isFormDisabled = useIsFormDisabled();

  const [isFrozen, setIsFrozen] = useState(true);

  const applicantAddress = useWatch({ control: form.control, name: "applicantAddress" });
  const prevValueRef = useRef(applicantAddress);

  const [debouncedAddress, setDebouncedAddress] = useState(applicantAddress);

  useDebounce(() => setDebouncedAddress(applicantAddress), 500, [applicantAddress]);

  const isEnabled = !isFormDisabled && debouncedAddress && debouncedAddress.length > 4 && !isFrozen;

  const addressQuery = useQuery({
    queryKey: ["address", debouncedAddress],
    queryFn: () => searchAddress(debouncedAddress!),
    enabled: !!isEnabled,
  });

  const isLoading = addressQuery.isLoading && isEnabled;
  const suggestions = addressQuery.data;

  return (
    <Stack mb="28px">
      <Combobox.Root
        disabled={isFormDisabled}
        itemToString={(item) => (item as AddressResult).address ?? ""}
        itemToValue={(item) => (item as AddressResult).label ?? ""}
        items={suggestions ?? []}
        value={applicantAddress ? [applicantAddress.toString()] : undefined}
        inputValue={applicantAddress ?? ""}
        onBlur={() => {
          if (prevValueRef.current) {
            form.setValue("applicantAddress", prevValueRef.current);
          }
        }}
        onInputValueChange={(e) => {
          prevValueRef.current = applicantAddress;
          form.setValue("applicantAddress", e.value);
          setIsFrozen(false);
        }}
        onValueChange={(e) => {
          if (e.items?.length === 0) return;
          prevValueRef.current = null;
          form.setValue("applicantAddress", (e.items?.[0] as AddressResult)?.address ?? "");
          form.setValue("zipCode", (e.items?.[0] as AddressResult)?.zipCode ?? "");
          form.setValue("city", (e.items?.[0] as AddressResult)?.city ?? "");
          setIsFrozen(true);
        }}
      >
        <Combobox.Control>
          <Combobox.Input asChild placeholder="">
            <ProxyInput isLoading={isLoading} disabled={isFormDisabled} />
          </Combobox.Input>
          {/* <Combobox.Trigger asChild top="unset !important" bottom="28px">
            <Button iconId="ri-arrow-down-line" aria-label="open" priority="tertiary no outline" size="small"></Button>
          </Combobox.Trigger> */}
        </Combobox.Control>
        <Combobox.Positioner>
          <Combobox.Content maxH="400px" bgColor="background-contrast-grey" overflow="auto">
            <Combobox.ItemGroup id="service-instructeur">
              {suggestions?.length
                ? suggestions.map((item: AddressResult) => (
                    <Combobox.Item key={item.label} item={item}>
                      <Combobox.ItemText>{item.label}</Combobox.ItemText>
                    </Combobox.Item>
                  ))
                : null}
            </Combobox.ItemGroup>
          </Combobox.Content>
        </Combobox.Positioner>
      </Combobox.Root>
      {isLoading ? (
        <styled.div hideFrom="lg" mt="8px">
          <LoadingBadge />
        </styled.div>
      ) : null}
    </Stack>
  );
};

const ProxyInput = ({ disabled, isLoading, ...props }: any) => {
  return (
    <Input
      label={
        <Flex flexDir="row" alignItems="center">
          <styled.span mr="12px">Adresse (numéro, voie)</styled.span>
          {isLoading ? (
            <styled.div hideBelow="lg">
              <LoadingBadge />
            </styled.div>
          ) : null}
        </Flex>
      }
      disabled={disabled}
      nativeInputProps={{ ...props, autoComplete: "new-password" }}
    />
  );
};

const LoadingBadge = () => {
  return (
    <Badge
      className={css({
        display: "flex",
        flexDir: "row",
        alignItems: "center",
        fontWeight: "normal",
      })}
      severity="info"
      noIcon
    >
      <styled.i
        className={fr.cx("fr-icon-refresh-line", "fr-icon--sm")}
        _before={{
          verticalAlign: "middle",
          mr: "4px",
        }}
      ></styled.i>
      Recherche en cours
    </Badge>
  );
};
