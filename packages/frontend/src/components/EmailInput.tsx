import Button from "@codegouvfr/react-dsfr/Button";
import Input, { InputProps } from "@codegouvfr/react-dsfr/Input";
import { css } from "#styled-system/css";
import { Stack, styled } from "#styled-system/jsx";
import { useRef, useState } from "react";
import { useClickAway } from "react-use";
import { useMachine } from "@xstate/react";
import { createSuggestionMachine } from "../features/suggestionsMachine";
import { db } from "../db/db";

export const EmailInput = ({
  label,
  hintText,
  nativeInputProps,
  value,
  onValueChange,
}: Partial<InputProps> & {
  value: string[];
  onValueChange: (value: string[]) => void;
}) => {
  const [state, send] = useMachine(emailMachine);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const onClick = () => {
    const emailToAdd = state.context.selected;
    if (!emailToAdd) return;
    if (!value.includes(emailToAdd)) {
      onValueChange([...value, emailToAdd]);
    }

    send({ type: "CLEAR" });
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.stopPropagation();

      onClick();
    }
  };

  useClickAway(wrapperRef, () => {
    send({ type: "BLUR" });
  });

  const isOpen = state.matches("suggesting") || state.matches("error");
  const isLoading = state.matches("fetching");
  const suggestions = state.context.suggestions;

  return (
    <Stack mb="28px">
      <styled.div ref={wrapperRef} pos="relative" w="100%">
        <Input
          className={css({})}
          label={label}
          hintText={hintText}
          nativeInputProps={{
            ...nativeInputProps,
            type: "email",
            value: state.context.query,
            onChange: (e) => send({ type: "TYPE", value: e.target.value }),
            onKeyDown: handleKeyPress,
          }}
        />

        <Button
          className={css({
            position: "absolute",
            right: "0",
            bottom: "1.5rem",
            backgroundColor: "transparent !important",
          })}
          priority="tertiary no outline"
          iconId="ri-add-line"
        >
          Ajouter
        </Button>

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
                    key={item}
                    onClick={() => {
                      send({ type: "SELECT", item });
                    }}
                    p="8px"
                    cursor="pointer"
                    _hover={{ bg: "white" }}
                  >
                    {item}
                  </styled.div>
                ))}
              </styled.div>
            )}
          </styled.div>
        ) : (
          <styled.div></styled.div>
        )}
      </styled.div>
      {/* {isLoading ? (
        <styled.div hideFrom="lg" mt="8px">
          <LoadingBadge />
        </styled.div>
      ) : null} */}
    </Stack>
  );

  return <styled.div ref={wrapperRef} position="relative"></styled.div>;
};

const emailMachine = createSuggestionMachine<EmailSuggestion>({
  fetchSuggestions: (query: string) =>
    db
      .selectFrom("suggested_email")
      .where("email", "like", `%${query}%`)
      .select(["email"])
      .execute()
      .then((res) => res.map((r) => r.email as string)),
});

type EmailSuggestion = string;
