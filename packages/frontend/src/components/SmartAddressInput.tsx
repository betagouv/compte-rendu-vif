import { css } from "#styled-system/css";
import { Flex, Stack, styled } from "#styled-system/jsx";
import { fr } from "@codegouvfr/react-dsfr";
import Badge from "@codegouvfr/react-dsfr/Badge";
import Input from "@codegouvfr/react-dsfr/Input";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { useClickAway, useDebounce } from "react-use";
import { Report } from "../db/AppSchema";
import { AddressResult, AddressSuggestion, searchAddress } from "../features/address";
import { useIsFormDisabled } from "../features/DisabledContext";
import { Combobox } from "./Combobox";
import { fromPromise, setup } from "xstate";
import { useMachine } from "@xstate/react";

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

                      send({ type: "SELECT", address: item });
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

const addressMachine = setup({
  types: {
    context: {} as {
      query: string;
      suggestions: AddressSuggestion[];
      error?: string;
      selectedAddress?: AddressSuggestion;
    },
    events: {} as
      | { type: "TYPE"; value: string }
      | { type: "CLEAR" }
      | { type: "SELECT"; address: string }
      | { type: "FETCH.SUCCESS"; suggestions: string[] }
      | { type: "FETCH.ERROR"; error: string }
      | { type: "BLUR" }
      | { type: "FOCUS" },
  },
  guards: {
    hasMinLength: ({ context }) => context.query.length >= 3,
  },
  actions: {
    updateQuery: ({ context, event }) => {
      if (event.type === "TYPE") {
        context.query = event.value;
      }
    },
    clearQuery: ({ context }) => {
      context.query = "";
      context.suggestions = [];
      context.selectedAddress = undefined;
    },
    updateSuggestions: ({ context, event }) => {
      // @ts-ignore
      context.suggestions = event.output;
    },
    selectAddress: ({ context, event }) => {
      if (event.type === "SELECT") {
        context.selectedAddress = event.address;
        context.query = event.address;
      }
    },
    setError: ({ context, event }) => {
      // @ts-ignore
      context.error = event.error;
    },
  },
  actors: {
    fetchSuggestions: fromPromise(async ({ input }: { input: { query: string } }) => {
      const suggestions = await searchAddress(input.query);
      return suggestions;
    }),
  },
}).createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QEMIQE51gQQK4BcB7AY0IFsAHAGzHzADoBLCGgYgBUBNABQFEBtAAwBdRKAqFYjfI0IA7MSAAeiAIwBmDfQAcqgEwBWTQE5jAdm3qALHoA0IAJ6IAbFef0rq587Nn1fg31VAF9g+1QMLDwiUkoaOiYWMFYAMQB5AGEAVQBlIVEkEAkpGXlFFQQNLV1DE3NLG3snBEt3PWMvMz1BI1UrG1DwtExYHAIScmpaBgAzElxYSA4eARFFYulZBUKK1QMzY3pBCz3tQStjQUMmxFb6A09vIzMDZ17BkAiRsZjJ+Nn5osIKwAEIAGSyACV8utJJsyjs1OofPRnIZBJpnKozrobggLAZ6AdOpjLm4rB8vlFxrEpglIJs5FBlnwYYUNqVtqBdgcrPcTt5nJc9KozHjtM5BPR1AZtOZJa9BKLjJThtTfnFpvQGTImawMmDeNhoWt2XDOeU1FjDuiMVZ-KoMWYrHjjOp1ESOj4MSKzBjtKrIqNohNNfSIIzmeCoWzxOatpbKt4pQ8hX0McqjHjHZojo8XnofC8rAZA98Q7T-tqI7rmbGivGEdy1PtDsddLLzsKDHjDKp6LbVMYziK9P0A2FPmrgzS-lqdYw9fxVAU4yUE4ik1cdPoHuo9C9tAZro5EAcU-nh25nqXJ1SZxq6QwIGAAEaEXByYiL5lcVmmtd4S5ZRED0fcBxqC5JSPHxh3FfsDEEJDjjRQRnE0QIy3VUMn3oF930-b89WjE1VwbdcmxAhAwL0CD9CgwQYIObQ8WRQ4XiQ3dBW0PQxywh8cKrfCPy-H9WCUWB8GQBJkBmOh0AACkQwQAEpWHvH5BK1YTCJ-esOQ3ZtqPAvRIOMaDXmY10sSOSxND9LErD8Zx+M0ystRmWhiAACzEiB5AYRcADdCAAawYDSKznBJPPwHyfwQYKSGkrZ8n0xtgIqGi6LHczGMsuDT0qJDtHuOzHgeHEXLvac3Oi2YvN8vUwHQdBCHQehqGkuZ0DIehItnMMGripqoESuQQuIFL5DSgDyKAxMng8ZxtDMIUHl9QJXUCeh6NMP1TOPXjXKiob6Fi+K9T-VYyIMyiKiWtxVvWmxRS2oqNCPWz3WPN1TIPE7Btwi7RtBCFSNhCjMpcN5lue4wNre1Q8QeftkKVRjjH+jpAcfKtYFwKAYEksTrvSqHE2y0y9os2CWI+nwPXdH6LAsVbfFxrSEgJom4FrVgcl4Q0MnYcmFs3KmzNpqyPsdWi7P3DEOkMbQKRqoM6rOnnif5kixYtCWTKl-K6bxGwpUHPpEIsJVqqGDXTtw7W+bEg0jQhs0KcN2jqdy6XCuaM5CVWxD9DOc9rE59zubAGhiDoYEybmu7oYQUxSvM9m5WeEtnGzX6B0YmUHh6I8+PV8sgfx2OwHjpY3eNfXDKo9P6Ez3xs-8XPs0EN1C4abx2jedoo-q+hFjjhOwZjZOMsTVv24sBGu9ebMhylEtLECfZ9n9Uezpatr0BZG7IfFoyF5Wjvl+dVePrHKUEa384DGHJUzH33DD-a-VDUb2evYX2HG3K+S8c532aN4fsHEMbuisKtXQoRJxyEIC+eAhQBp42mGfA2RkAC0ecioEM-lWZgNAcHN12KKfsNReg0U8C6IqK1CRolDu6N4R43AkI8oCSAFD7pqDcO4N4aJVYHjeFcRhzReTShgehLw6hzLcPDJGfhqdsR7COMhGw-QVqeGsrRaCw5HRXDQhKZRz43wiSIlANRiZGiyzMG3dEOYvCWD8BY86jUfx2M3Padw+5aFYnUEec46htpSnRnsUyvdTITntpXLB3NCY6x8Z7c+VF4EeDQmOV+-hCwiggYge0fJHjJntFjJCehPET1rgnXxRkJQ2mUqZXw2N6bNFUPodwfp3FGE8McdQnjv7oAaVRJp0on5YjMF4C41hXR+A8KYN0iEZQSnOEg4IQA */
  id: "addressAutocomplete",
  initial: "idle",
  context: () => ({
    query: "",
    suggestions: [],
  }),
  states: {
    idle: {
      on: {
        TYPE: {
          target: "editing",
          actions: "updateQuery",
        },
        FOCUS: "focused",
      },
    },
    focused: {
      on: {
        TYPE: {
          target: "editing",
          actions: "updateQuery",
        },
        BLUR: "idle",
      },
    },
    editing: {
      always: [
        {
          target: "debouncing",
          guard: "hasMinLength",
        },
        {
          target: "focused",
        },
      ],
      on: {
        TYPE: {
          actions: "updateQuery",
        },
        CLEAR: {
          target: "idle",
          actions: "clearQuery",
        },
        BLUR: "idle",
      },
    },
    debouncing: {
      after: {
        500: "fetching",
      },
      on: {
        TYPE: {
          target: "editing",
          actions: "updateQuery",
        },
        BLUR: "idle",
      },
    },
    fetching: {
      invoke: {
        src: "fetchSuggestions",
        input: ({ context }) => ({ query: context.query }),
        onDone: {
          target: "suggesting",
          actions: "updateSuggestions",
        },
        onError: {
          target: "error",
          actions: "setError",
        },
      },
      on: {
        TYPE: {
          target: "editing",
          actions: "updateQuery",
        },
        BLUR: "idle",
      },
    },
    suggesting: {
      on: {
        TYPE: {
          target: "editing",
          actions: "updateQuery",
        },
        SELECT: {
          target: "selected",
          actions: "selectAddress",
        },
        BLUR: "idle",
        CLEAR: {
          target: "idle",
          actions: "clearQuery",
        },
      },
    },
    selected: {
      on: {
        TYPE: {
          target: "editing",
          actions: "updateQuery",
        },
        CLEAR: {
          target: "idle",
          actions: "clearQuery",
        },
        BLUR: "idle",
      },
    },
    error: {
      on: {
        TYPE: {
          target: "editing",
          actions: "updateQuery",
        },
        CLEAR: {
          target: "idle",
          actions: "clearQuery",
        },
      },
    },
  },
});
