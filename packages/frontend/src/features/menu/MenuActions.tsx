import { Center, Divider, Stack, styled } from "#styled-system/jsx";
import { css } from "#styled-system/css";
import Button from "@codegouvfr/react-dsfr/Button";
import { useLogout } from "../../contexts/AuthContext";
import { electric } from "../../db";
import { NestedMenu } from "./MenuButton";
import { menuStore } from "./menuStore";
import { Fragment } from "react/jsx-runtime";
import { MenuTitle } from "./MenuTitle";

export const MenuActions = ({ menu }: { menu: NestedMenu | null }) => {
  const setMenu = (menu: NestedMenu) => {
    menuStore.send({ type: "setMenu", menu });
  };

  const logout = useLogout();

  const actions = [
    { text: "Partage des CR", onClick: () => setMenu("share") },
    { text: "Clauses départementales", onClick: () => setMenu("clauses-departementales") },
    { text: "Clauses nationales", onClick: () => setMenu("clauses-nationales") },
    { text: "Assistance technique", onClick: () => setMenu("help") },
    { text: "Se déconnecter", onClick: logout },
  ];

  return (
    <>
      <styled.div hideFrom={menu === null ? "lg" : undefined}>
        <MenuTitle hideDivider>Mon compte</MenuTitle>
      </styled.div>
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
        {actions.map(({ text, onClick }, index) => (
          <Fragment key={text}>
            <Button
              className={css({ w: "100%" })}
              type="button"
              priority="tertiary no outline"
              onClick={(e) => {
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
    </>
  );
};
