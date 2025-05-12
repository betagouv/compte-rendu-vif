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
    { text: "Clauses nationales", onClick: () => menuActor.send({ type: "GO_TO_CLAUSES_NAT" }) },
    { text: "Partage des CR", onClick: () => menuActor.send({ type: "GO_TO_SHARE" }) },
    { text: "Aide", onClick: () => menuActor.send({ type: "GO_TO_HELP" }) },
    { text: "Se déconnecter", onClick: logout, dataTestId: "logout" },
  ];

  return (
    <>
      <styled.div hideFrom="lg">
        <MenuTitle hideDivider>Paramètre</MenuTitle>
      </styled.div>
      <Stack
        className={css({
          gap: "0",
        })}
      >
        {actions.map(({ text, onClick, dataTestId }, index) => (
          <Fragment key={text}>
            <Button
              className={css({
                w: "100%",
                h: "48px",
                m: 0,
                px: "16px !important",
                color: "black",
                fontSize: "14px",
                "&:disabled": {
                  color: "text-disabled-grey",
                },
              })}
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

            <Center>
              <Divider w="calc(100% - 32px)" />
            </Center>
          </Fragment>
        ))}

        <Button
          className={css({ w: "100%", mt: "8px", fontSize: "14px" })}
          linkProps={{ href: "https://compte-rendu-vif.beta.gouv.fr/faq", target: "_blank" }}
          priority="tertiary no outline"
        >
          En savoir plus
        </Button>
      </Stack>
    </>
  );
};
