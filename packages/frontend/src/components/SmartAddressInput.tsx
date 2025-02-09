import { css } from "#styled-system/css";
import { Flex, Stack, styled } from "#styled-system/jsx";
import { fr } from "@codegouvfr/react-dsfr";
import Badge from "@codegouvfr/react-dsfr/Badge";
import Input from "@codegouvfr/react-dsfr/Input";
import { useMachine } from "@xstate/react";
import { useRef } from "react";
import { useFormContext } from "react-hook-form";
import { useClickAway } from "react-use";
import { Report } from "../db/AppSchema";
import { AddressSuggestion, searchAddress } from "../features/address";
import { useIsFormDisabled } from "../features/DisabledContext";
import { createSuggestionMachine } from "../features/suggestionsMachine";

export const SmartAddressInput = () => {
  const form = useFormContext<Report>();
  const isFormDisabled = useIsFormDisabled();
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [state, send] = useMachine(addressMachine, {});

  useClickAway(wrapperRef, () => {
    send({ type: "BLUR" });
  });

  const isOpen = state.matches("suggesting") || state.matches("error");
  const isLoading = state.matches("fetching");
  const suggestions = state.context.suggestions;

  const inputProps = form.register("applicantAddress");

  return (
    <Stack mb="28px">
      <styled.div ref={wrapperRef} pos="relative" w="100%">
        <Input
          className={css({ mb: "8px" })}
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
          disabled={isFormDisabled}
          nativeInputProps={{
            autoComplete: "new-password",
            ...inputProps,
            onChange: (e) => {
              inputProps.onChange(e);
              send({ type: "TYPE", value: e.target.value });
            },
            onFocus: () => send({ type: "FOCUS" }),
          }}
        />

        {isOpen ? (
          <styled.div
            zIndex="10"
            pos="absolute"
            borderRadius="5px"
            w="100%"
            height="300px"
            maxHeight="400px"
            bgColor="background-contrast-grey"
            overflow="auto"
          >
            {isLoading ? null : suggestions.length === 0 ? (
              "Aucun résultat"
            ) : (
              <styled.div>
                {suggestions.map((item) => (
                  <styled.div
                    key={item.label}
                    onClick={() => {
                      form.setValue("applicantAddress", item?.address ?? "");
                      form.setValue("zipCode", item?.zipCode ?? "");
                      form.setValue("city", item?.city ?? "");

                      send({ type: "SELECT", item: item });
                    }}
                    p="8px"
                    cursor="pointer"
                    _hover={{ bg: "white" }}
                  >
                    {item.label}
                  </styled.div>
                ))}
              </styled.div>
            )}
          </styled.div>
        ) : (
          <styled.div></styled.div>
        )}
      </styled.div>
      {isLoading ? (
        <styled.div hideFrom="lg" mt="8px">
          <LoadingBadge />
        </styled.div>
      ) : null}
    </Stack>
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

const addressMachine = createSuggestionMachine<AddressSuggestion>({
  fetchSuggestions: (query: string) => searchAddress(query),
});
