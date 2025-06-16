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
    {
      icon: "fr-icon-account-circle-fill",
      text: "Mon compte",
      onClick: () => navigateAndClose({ to: "/account" }),
      mobileOnly: true,
    },
    { icon: "fr-icon-france-fill", text: "UDAP", onClick: () => navigateAndClose({ to: "/udap" }), mobileOnly: true },
    { icon: "fr-icon-info-fill", text: "Aide", onClick: () => menuActor.send({ type: "GO_TO_HELP" }) },
    { icon: "fr-icon-logout-box-r-line", text: "Déconnexion", onClick: logout, dataTestId: "logout" },
  ];

  return (
    <>
      <styled.div hideFrom="lg">
        <MenuTitle hideDivider> </MenuTitle>
      </styled.div>
      <Stack
        className={css({
          gap: "0",
        })}
      >
        {actions.map(({ text, onClick, dataTestId, mobileOnly, icon }, index) => (
          <MenuAction
            key={index}
            text={text}
            onClick={onClick}
            dataTestId={dataTestId}
            mobileOnly={mobileOnly}
            icon={icon}
          />
        ))}
      </Stack>
    </>
  );
};

const MenuAction = ({
  text,
  onClick,
  dataTestId,
  mobileOnly,
  icon,
}: {
  text: string;
  onClick: () => void;
  dataTestId?: string;
  mobileOnly?: boolean;
  icon: string;
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
        iconId={icon as any}
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
