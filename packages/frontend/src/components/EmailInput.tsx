import Button from "@codegouvfr/react-dsfr/Button";
import Input, { InputProps } from "@codegouvfr/react-dsfr/Input";
import { css } from "#styled-system/css";
import { Flex, Stack, styled } from "#styled-system/jsx";
import { useEffect, useRef } from "react";
import { useClickAway } from "react-use";
import { useMachine } from "@xstate/react";
import { createSuggestionMachine } from "../features/suggestionsMachine";
import { db, useDbQuery } from "../db/db";
import Tag from "@codegouvfr/react-dsfr/Tag";
import { useMutation } from "@tanstack/react-query";
import { useUser } from "../contexts/AuthContext";

export const EmailInput = ({
  label,
  hintText,
  nativeInputProps,
  value,
  onValueChange,
  single,
}: Partial<InputProps> & {
  value: string[];
  single?: boolean;
  onValueChange: (value: string[]) => void;
}) => {
  const [state, send] = useMachine(emailMachine, {
    input: {
      query: single ? value[0] : "",
    },
  });
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!single || !state.context.selected) return;
    onValueChange([state.context.selected]);
  }, [state.context.selected]);

  // when clicking on the add button
  const onClick = () => {
    const emailToAdd = state.context.query;
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

  const user = useUser()!;

  const deleteSuggestionMutation = useMutation(async (email: string) => {
    await db.deleteFrom("suggested_email").where("email", "=", email).where("udap_id", "=", user.udap_id).execute();

    send({
      type: "REMOVE",
      item: email,
    });
  });

  const isOpen = state.matches("suggesting") || state.matches("error");
  const suggestions = state.context.suggestions;

  return (
    <Stack>
      <styled.div ref={wrapperRef as any} pos="relative" w="100%">
        <Input
          className={css({
            mb: "1.5rem",
          })}
          label={label}
          hintText={hintText}
          nativeInputProps={{
            ...nativeInputProps,
            type: "email",
            value: state.context.query,
            onChange: (e) => {
              if (single) onValueChange([e.target.value]);
              send({ type: "TYPE", value: e.target.value });
            },
            onKeyDown: handleKeyPress,
          }}
        />

        {!single ? (
          <Button
            className={css({
              zIndex: 1,
              position: "absolute",
              right: "0",
              bottom: "1.5rem",
              backgroundColor: "transparent !important",
            })}
            type="button"
            priority="tertiary no outline"
            iconId="ri-add-line"
            onClick={onClick}
          >
            Ajouter
          </Button>
        ) : null}

        {isOpen ? (
          <styled.div
            zIndex="10"
            pos="absolute"
            borderRadius="5px"
            w="100%"
            maxHeight="300px"
            bgColor="white"
            transform="translateY(-1.25rem)"
            overflow="auto"
          >
            {suggestions.length === 0 ? null : (
              <styled.div>
                {suggestions.map((item) => (
                  <styled.div
                    key={item}
                    onClick={() => {
                      send({ type: "SELECT", item });
                    }}
                    position="relative"
                    p="8px"
                    cursor="pointer"
                    _hover={{
                      bg: "#ECECFE",
                      "& > div": {
                        display: "block",
                      },
                    }}
                  >
                    {item}
                    <styled.div display="none">
                      {/* @ts-ignore */}
                      <Button
                        className={css({
                          position: "absolute",
                          top: 0,
                          right: 0,
                          backgroundColor: "transparent !important",
                        })}
                        type="button"
                        priority="tertiary no outline"
                        iconId="ri-close-line"
                        onClick={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          deleteSuggestionMutation.mutate(item);
                        }}
                      ></Button>
                    </styled.div>
                  </styled.div>
                ))}
                <styled.div w="100%" minH="46px" p="8px" color="#000091" textAlign="center" bg="#ECECFE">
                  La suppression de contact s'appliquera à toute l'UDAP
                </styled.div>
              </styled.div>
            )}
          </styled.div>
        ) : null}
      </styled.div>

      {!single ? (
        <Flex gap="8px" justifyContent="center" alignItems="center" w="100%" mt="-16px" flexWrap="wrap">
          {value.filter(Boolean).map((email) => (
            <Tag
              key={email}
              dismissible
              nativeButtonProps={{
                type: "button",
                onClick: () => {
                  onValueChange(value.filter((v) => v !== email));
                },
              }}
              small
            >
              {email}
            </Tag>
          ))}
        </Flex>
      ) : null}
    </Stack>
  );
};

export const emailMachine = createSuggestionMachine<EmailSuggestion>({
  minLength: 1,
  fetchSuggestions: (query: string) =>
    db
      .selectFrom("suggested_email")
      .where("email", "like", `%${query}%`)
      .select(["email"])
      .execute()
      .then((res) => res.map((r) => r.email as string)),
});

type EmailSuggestion = string;
