import { Center, Divider, Stack, styled } from "#styled-system/jsx";
import { css } from "#styled-system/css";
import Button from "@codegouvfr/react-dsfr/Button";
import { useLogout } from "../../contexts/AuthContext";
import { Fragment } from "react/jsx-runtime";
import { MenuTitle } from "./MenuTitle";
import { menuActor } from "./menuMachine";
import { useNavigate } from "@tanstack/react-router";

export const MenuActions = () => {
  const logout = useLogout();

  const navigate = useNavigate();

  const navigateAndClose = (props: any) => {
    navigate(props);
    menuActor.send({ type: "CLOSE" });
  };

  const actions = [
    { text: "Mon compte", onClick: () => navigateAndClose({ to: "/account" }), mobileOnly: true },
    { text: "UDAP", onClick: () => navigateAndClose({ to: "/udap" }), mobileOnly: true },
    { text: "Clauses nationales", onClick: () => menuActor.send({ type: "GO_TO_CLAUSES_NAT" }) },
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
        {actions.map(({ text, onClick, dataTestId, mobileOnly }, index) => (
          <MenuAction key={index} text={text} onClick={onClick} dataTestId={dataTestId} mobileOnly={mobileOnly} />
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

const MenuAction = ({
  text,
  onClick,
  dataTestId,
  mobileOnly,
}: {
  text: string;
  onClick: () => void;
  dataTestId?: string;
  mobileOnly?: boolean;
}) => {
  return (
    <>
      <Button
        className={css({
          hideFrom: mobileOnly ? "lg" : undefined,
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
    </>
  );
};
