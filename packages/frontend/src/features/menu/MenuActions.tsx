import { useLogout } from "../../contexts/AuthContext";
import { Fragment } from "react/jsx-runtime";
import { MenuTitle } from "./MenuTitle";
import { menuActor } from "./menuMachine";
import { useNavigate } from "@tanstack/react-router";
import { Box, Stack } from "@mui/material";
import { Button, Center } from "#components/MUIDsfr.tsx";
import { Divider } from "#components/ui/Divider.tsx";

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
      <Box display={{ lg: "none" }}>
        <MenuTitle hideDivider> </MenuTitle>
      </Box>
      <Stack gap="0">
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
        sx={{
          display: mobileOnly ? { lg: "none" } : undefined,
          width: "100%",
          height: "48px",
          m: 0,
          px: "16px !important",

          color: "text-active-blue-france",
          fontSize: "16px",
          "&:disabled": {
            color: "text-disabled-grey",
          },
        }}
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
        <Divider width="calc(100% - 32px)" />
      </Center>
    </>
  );
};
