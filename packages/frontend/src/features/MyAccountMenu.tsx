import { Popover } from "#components/Popover";
import { css } from "#styled-system/css";
import { Center, Divider, Stack, styled } from "#styled-system/jsx";
import Button from "@codegouvfr/react-dsfr/Button";
import { useRef } from "react";
import { useLogout } from "../contexts/AuthContext";
import { electric } from "../db";

export const MyAccountMenu = () => {
  const ref = useRef<HTMLAnchorElement>(null);

  return (
    <>
      <styled.div hideBelow="lg">
        <Popover.Root>
          <Popover.Trigger asChild>
            <Button ref={ref as any} priority="tertiary" iconId="fr-icon-account-circle-fill">
              Mon compte
            </Button>
          </Popover.Trigger>
          <Popover.Positioner>
            <Popover.Content borderRadius="0">
              <MyAccountMenuActions />
            </Popover.Content>
          </Popover.Positioner>
        </Popover.Root>
      </styled.div>
      <styled.div hideFrom="lg">
        <MyAccountMenuActions />
      </styled.div>
    </>
  );
};
export const actionsContainerClassName = css({
  gap: "0",
  px: "16px",
  "& > button": {
    h: "48px",
    m: 0,
    color: "black",
    fontSize: "14px",
    "&:disabled": {
      color: "text-disabled-grey",
    },
  },
});
const MyAccountMenuActions = () => {
  const logout = useLogout();
  const deleteLocalData = () => {
    if (electric.isConnected) electric.disconnect();
    localStorage.clear();
    indexedDB.deleteDatabase("crvif.db");
    window.location.reload();
  };

  const actions = [
    { text: "Partage des CR", onClick: () => {}, disabled: true },
    { text: "Clauses départementales", onClick: () => {}, disabled: true },
    { text: "Clauses nationales", onClick: () => {}, disabled: true },
    { text: "Se déconnecter", onClick: logout },
    { text: "Supprimer les données locales", onClick: deleteLocalData },
  ];

  return (
    <Stack className={actionsContainerClassName}>
      {actions.map(({ text, onClick, disabled }, index) => (
        <>
          <Button disabled={disabled} onClick={onClick}>
            {text}
          </Button>
          {index < actions.length - 1 && (
            <Center>
              <Divider w="85%" />
            </Center>
          )}
        </>
      ))}
    </Stack>
  );
};
