import { Center, Divider, Stack } from "#styled-system/jsx";
import { css } from "#styled-system/css";
import Button from "@codegouvfr/react-dsfr/Button";
import { useLogout } from "../../contexts/AuthContext";
import { electric } from "../../db";
import { NestedMenu } from "./MenuButton";
import { menuStore } from "./menuStore";
import { Fragment } from "react/jsx-runtime";

export const MenuActions = () => {
  const setMenu = (menu: NestedMenu) => {
    menuStore.send({ type: "setMenu", menu });
  };

  const logout = useLogout();

  const actions = [
    { text: "Partage des CR", onClick: () => {}, disabled: true },
    { text: "Clauses départementales", onClick: () => {}, disabled: true },
    { text: "Clauses nationales", onClick: () => {}, disabled: true },
    { text: "Assistance technique", onClick: () => setMenu("help") },
    { text: "Se déconnecter", onClick: logout },
  ];

  return (
    <Stack
      className={css({
        gap: "0",
        "& > button": {
          h: "48px",
          m: 0,
          px: "16px !important",
          color: "black",
          fontSize: "14px",
          "&:disabled": {
            color: "text-disabled-grey",
          },
        },
      })}
    >
      {actions.map(({ text, onClick, disabled }, index) => (
        <Fragment key={text}>
          <Button
            className={css({ w: "100%" })}
            type="button"
            disabled={disabled}
            priority="tertiary no outline"
            onClick={(e) => {
              console.log("a");
              e.preventDefault();
              onClick();
            }}
          >
            {text}
          </Button>
          {index < actions.length - 1 && (
            <Center>
              <Divider w="calc(100% - 32px)" />
            </Center>
          )}
        </Fragment>
      ))}
    </Stack>
  );
};
