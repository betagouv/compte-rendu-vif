import { Popover } from "#components/Popover";
import { Status } from "#components/SyncForm";
import { css } from "#styled-system/css";
import { Center, Flex, styled } from "#styled-system/jsx";
import { Button } from "@codegouvfr/react-dsfr/Button";
import { PropsWithChildren, ReactNode, useEffect, useState } from "react";

import { useSelector } from "@xstate/react";
import { useIsDesktop } from "../../hooks/useIsDesktop";
import { ClauseMenu } from "./ClauseMenu";
import { HelpMenu } from "./HelpMenu";
import { MenuActions } from "./MenuActions";
import { ShareReport } from "./Share";

import { ReportSearch } from "#components/ReportSearch.tsx";
import { useRouter } from "@tanstack/react-router";
import { menuActor, MenuStates } from "./menuMachine";
import { ModalCloseButton } from "./MenuTitle";
import { ServicesMenu } from "./ServicesMenu";

export const MenuButton = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const menu = useSelector(menuActor, (state) => state.value);
  const isDesktop = useIsDesktop();

  const isPopoverOpen = menu === "main" && isDesktop;

  const router = useRouter();
  const isHome = router.latestLocation.pathname === "/";
  return (
    <>
      <Flex alignItems={{ base: "unset", lg: "center" }} h="100%">
        {isDesktop ? (
          <Flex alignItems="center">
            <Status className={css({ display: "flex", alignItems: "center", fontSize: "10px" })} />

            <Button
              className={css({ ml: "16px", mb: "0" })}
              priority="tertiary"
              linkProps={{ to: "/udap" }}
              iconId="fr-icon-france-fill"
            >
              UDAP
            </Button>
            <Popover.Root
              positioning={{ placement: "bottom-end" }}
              modal
              open={isPopoverOpen}
              onOpenChange={({ open }) => {
                if (!isDesktop) return;
                if (open) menuActor.send({ type: "OPEN" });
                if (menu === "main") menuActor.send({ type: "CLOSE" });
              }}
            >
              <Popover.Trigger asChild>
                <Button
                  className={css({ ml: "16px", mb: "0" })}
                  priority="tertiary"
                  iconId="ri-settings-2-fill"
                  data-test-id="settings-menu"
                >
                  Paramètre
                </Button>
              </Popover.Trigger>
              <Popover.Positioner>
                <Popover.Content borderRadius="0">
                  <MenuActions />
                </Popover.Content>
              </Popover.Positioner>
            </Popover.Root>
          </Flex>
        ) : (
          <Center zIndex="1250" pos="absolute" top="0" right="24px" h="100%">
            {isHome ? (
              // @ts-ignore
              <Button
                className={css({ hideFrom: "lg" })}
                iconId="fr-icon-search-line"
                priority="tertiary no outline"
                nativeButtonProps={{
                  onClick: () => setIsSearchOpen(true),
                  type: "button",
                }}
              />
            ) : null}
            {/* @ts-ignore */}
            <Button
              iconId="fr-icon-account-circle-fill"
              priority="tertiary no outline"
              nativeButtonProps={{
                onClick: () => menuActor.send({ type: "OPEN" }),
                type: "button",
              }}
            />
          </Center>
        )}
      </Flex>
      <MenuModal />
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};

const modalContents: Record<MenuStates, (props: ModalContentProps) => ReactNode> = {
  main: (_props) => <MenuActions />,
  help: (_props) => <HelpMenu />,
  clausesDepartementales: (props) => <ClauseMenu isNational={false} {...props} />,
  clausesNationales: (props) => <ClauseMenu isNational {...props} />,
  share: (props) => <ShareReport {...props} />,
  services: (_props) => <ServicesMenu />,
  closed: () => null,
};

const SearchModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Flex flexDir="column" w="100%" h="100%" p="16px">
        <Flex justifyContent="flex-end" mb="8px">
          <ModalCloseButton onClose={onClose} />
        </Flex>
        <ReportSearch
          inputProps={{
            placeholder: "Rechercher",
            className: "",
            id: "search-input",
            type: "text",
          }}
        />
      </Flex>
    </Modal>
  );
};

export const MenuModal = () => {
  const menu = useSelector(menuActor, (state) => state.value);
  const isDesktop = useIsDesktop();

  const Content = modalContents[menu] ?? null;

  const isPopoverOpen = menu === "main" && isDesktop;
  const isModalOpen = !isPopoverOpen && menu !== "closed";

  return (
    <Modal isOpen={isModalOpen} onClose={() => menuActor.send({ type: "CLOSE" })}>
      <Content backButtonOnClick={() => menuActor.send({ type: "BACK" })} />
    </Modal>
  );
};

export type ModalContentProps = {
  backButtonOnClick: () => void;
};

const Modal = ({ isOpen, onClose, children }: PropsWithChildren & { isOpen: boolean; onClose: () => void }) => {
  useEffect(() => {
    const root = document.getElementById("root")!;

    if (isOpen) {
      root.style.pointerEvents = "none";
      root.style.overflow = "hidden";
    } else {
      root.style.pointerEvents = "auto";
      root.style.overflow = "auto";
    }

    return () => {
      root.style.pointerEvents = "auto";
      root.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <styled.div
      onClick={onClose}
      display={isOpen ? "flex" : "none"}
      zIndex="1800"
      position="fixed"
      inset="0"
      justifyContent={{ base: "center", lg: "flex-end" }}
      alignItems="flex-start"
      h="100vh"
      bg="rgba(0,0,0,0.5)"
      pointerEvents="auto"
    >
      <styled.dialog
        onClick={(e) => e.stopPropagation()}
        open={isOpen}
        position="relative"
        outline="none !important"
        w={{ base: "full", lg: "800px" }}
        h="full"
        m="0"
        px={{ base: 0, lg: "64px" }}
        bg="white"
        overflowY="auto"
        pointerEvents="auto"
      >
        {children}
      </styled.dialog>
    </styled.div>
  );
};
