import { Center, Divider, Stack, styled } from "#styled-system/jsx";
import { css } from "#styled-system/css";
import Button from "@codegouvfr/react-dsfr/Button";
import { useLogout } from "../../contexts/AuthContext";
import { Fragment } from "react/jsx-runtime";
import { MenuTitle } from "./MenuTitle";
import { menuActor } from "./menuMachine";

export const MenuActions = () => {
  const logout = useLogout();

  const actions = [
    { text: "Partage des CR", onClick: () => menuActor.send({ type: "GO_TO_SHARE" }) },
    { text: "Clauses départementales", onClick: () => menuActor.send({ type: "GO_TO_CLAUSES_DEPT" }) },
    { text: "Clauses nationales", onClick: () => menuActor.send({ type: "GO_TO_CLAUSES_NAT" }) },
    { text: "Assistance technique", onClick: () => menuActor.send({ type: "GO_TO_HELP" }) },
    { text: "Se déconnecter", onClick: logout, dataTestId: "logout" },
  ];

  return (
    <>
      <styled.div hideFrom="lg">
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
        {actions.map(({ text, onClick, dataTestId }, index) => (
          <Fragment key={text}>
            <Button
              className={css({ w: "100%" })}
              data-test-id={dataTestId}
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
