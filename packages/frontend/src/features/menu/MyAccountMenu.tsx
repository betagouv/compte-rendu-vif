import { Popover } from "#components/Popover";
import { css, cx } from "#styled-system/css";
import { Center, Divider, Flex, Stack, styled } from "#styled-system/jsx";
import Button from "@codegouvfr/react-dsfr/Button";
import { ReactNode, useRef, useState } from "react";
import { useLogout } from "../../contexts/AuthContext";
import { electric } from "../../db";
import { Status } from "#components/SyncForm";
import { RouteApi, getRouteApi } from "@tanstack/react-router";
import { useIsDesktop } from "../../hooks/useIsDesktop";
import { createModal } from "@codegouvfr/react-dsfr/Modal";
import { drawerMenu } from "./MenuDrawer";
import { useIsModalOpen } from "@codegouvfr/react-dsfr/Modal/useIsModalOpen";

export const MyAccountMenu = () => {
  const [menu, setMenu] = useState<NestedMenu>("main");
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  return (
    <>
      <styled.div hideBelow="lg">
        <Flex alignItems="center">
          <Status className={css({ display: "flex", alignItems: "center", fontSize: "10px" })} />
          <Popover.Root positioning={{ placement: "bottom-end" }}>
            <Popover.Trigger asChild>
              <Button className={css({ ml: "16px", mb: "0" })} priority="tertiary" iconId="fr-icon-account-circle-fill">
                Mon compte
              </Button>
            </Popover.Trigger>
            <Popover.Positioner>
              <Popover.Content borderRadius="0">
                <MyAccountMenuActions />
              </Popover.Content>
            </Popover.Positioner>
          </Popover.Root>
        </Flex>
      </styled.div>
      <styled.div hideFrom="lg">
        {/* @ts-ignore */}
        <Button
          iconId="fr-icon-account-circle-fill"
          priority="tertiary no outline"
          nativeButtonProps={{ onClick: () => menuModal.open() }}
        />

        {/* <MyAccountMenuActions /> */}
      </styled.div>
    </>
  );
};

export const menuModal = createModal({ isOpenedByDefault: false, id: "menu-modal" });

export const actionsContainerClassName = css({
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
});

const nestedMenus = ["main", "help"] as const;
type NestedMenu = (typeof nestedMenus)[number];

export const MyAccountMenuActions = () => {
  const [menu, setMenu] = useState<NestedMenu>("main");
  const isDesktop = useIsDesktop();

  const isModalOpen = useIsModalOpen(drawerMenu, {
    onConceal: () => setMenu("main"),
  });

  useIsModalOpen(menuModal, {
    onConceal: () => setMenu("main"),
  });

  const hookSetMenu = (menu: NestedMenu) => {
    if (menu !== "main") {
      drawerMenu.open();
    } else drawerMenu.close();
    setMenu(menu);
  };

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
    { text: "Assistance technique", onClick: () => hookSetMenu("help") },
    { text: "Se déconnecter", onClick: logout },
  ];

  if (isDesktop && menu !== "main") {
    return null;
  }
  // return (
  //   <styled.div position="fixed" top="0" right="0" bottom="0" w="500px" h="100vh" bgColor="red" isolation={"isolate"}>
  //     salut
  //   </styled.div>
  // );

  if (menu === "help") {
    return (
      <Stack>
        <MenuTitle backButtonOnClick={() => setMenu("main")}>Assistance technique</MenuTitle>
      </Stack>
    );
  }

  return (
    <Stack className={cx(actionsContainerClassName)}>
      <styled.div hideFrom="lg">
        <MenuTitle>Mon compte</MenuTitle>
      </styled.div>
      {actions.map(({ text, onClick, disabled }, index) => (
        <>
          <Button
            className={css({ w: "100%" })}
            type="button"
            disabled={disabled}
            priority="tertiary no outline"
            onClick={(e) => {
              console.log("a");
              e.preventDefault();
              e.stopPropagation();
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
        </>
      ))}
    </Stack>
  );
};

const MenuTitle = ({ children, backButtonOnClick }: { children: ReactNode; backButtonOnClick?: () => void }) => (
  <Flex
    pos="absolute"
    top="16px"
    left="16px"
    justifyContent="space-between"
    alignItems="center"
    maxW="calc(100% - 95px - 32px)"
    h="40px"
  >
    <styled.div>
      {backButtonOnClick ? (
        // @ts-ignore
        <Button priority="tertiary no outline" iconId="ri-arrow-left-s-line" onClick={backButtonOnClick}></Button>
      ) : null}
    </styled.div>
    <styled.span fontSize="20px" fontWeight="bold" nowrap>
      {children}
    </styled.span>
    <div></div>
  </Flex>
);
