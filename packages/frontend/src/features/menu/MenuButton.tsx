import { Popover } from "#components/Popover";
import { Status } from "#components/SyncForm";
import { css, cx } from "#styled-system/css";
import { Center, Flex, styled } from "#styled-system/jsx";
import { ButtonProps, Button } from "@codegouvfr/react-dsfr/Button";
import { createModal } from "@codegouvfr/react-dsfr/Modal";
import { PropsWithChildren, ReactNode, useEffect, useRef } from "react";
import { useIsModalOpen } from "@codegouvfr/react-dsfr/Modal/useIsModalOpen";

import { useSelector } from "@xstate/react";
import { createPortal } from "react-dom";
import { useIsDesktop } from "../../hooks/useIsDesktop";
import { ClauseMenu } from "./ClauseMenu";
import { HelpMenu } from "./HelpMenu";
import { MenuActions } from "./MenuActions";
import { menuStore } from "./menuStore";
import { ShareReport } from "./Share";

import { menuActor, MenuStates } from "./menuMachine";

export const MenuButton = () => {
  const menu = useSelector(menuActor, (state) => state.value);
  const isDesktop = useIsDesktop();

  const Content = modalContents[menu] ?? null;

  const isPopoverOpen = menu === "main" && isDesktop;
  const isModalOpen = !isPopoverOpen && menu !== "closed";

  return (
    <>
      <Flex alignItems={{ base: "unset", lg: "center" }} h="100%">
        {isDesktop ? (
          <Flex alignItems="center">
            <Status className={css({ display: "flex", alignItems: "center", fontSize: "10px" })} />
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
                  iconId="fr-icon-account-circle-fill"
                  data-test-id="account-menu"
                >
                  Mon compte
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
    </>
  );
};

const modalContents: Record<MenuStates, (props: ModalContentProps) => ReactNode> = {
  main: (props) => <MenuActions />,
  help: (props) => <HelpMenu />,
  clausesDepartementales: (props) => <ClauseMenu isNational={false} {...props} />,
  clausesNationales: (props) => <ClauseMenu isNational {...props} />,
  share: (props) => <ShareReport {...props} />,
  closed: () => null,
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
        w={{ base: "full", lg: "800px" }}
        h="full"
        m="0"
        bg="white"
        overflowY="auto"
        pointerEvents="auto"
      >
        {children}
      </styled.dialog>
    </styled.div>
  );
};
