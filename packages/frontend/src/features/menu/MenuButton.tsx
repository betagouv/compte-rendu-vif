import { Popover } from "#components/Popover";
import { Status } from "#components/SyncForm";
import { css, cx } from "#styled-system/css";
import { Flex, styled } from "#styled-system/jsx";
import Button from "@codegouvfr/react-dsfr/Button";
import { createModal } from "@codegouvfr/react-dsfr/Modal";
import { ReactNode, useEffect, useRef } from "react";
import { useIsModalOpen } from "@codegouvfr/react-dsfr/Modal/useIsModalOpen";

import { useSelector } from "@xstate/store/react";
import { createPortal } from "react-dom";
import { useIsDesktop } from "../../hooks/useIsDesktop";
import { ClauseMenu } from "./ClauseMenu";
import { HelpMenu } from "./HelpMenu";
import { MenuActions } from "./MenuActions";
import { menuStore } from "./menuStore";
import { ShareReport } from "./Share";

import { useClickAway, useNetworkState } from "react-use";

const nestedMenus = ["main", "help", "clauses-nationales", "clauses-departementales", "share"] as const;
export type NestedMenu = (typeof nestedMenus)[number];

export const MenuButton = ({ headerRef }: { headerRef: any }) => {
  const menu = useSelector(menuStore, (state) => state.context.menu);
  const isDesktop = useIsDesktop();

  const { online } = useNetworkState();
  const status = !online ? "offline" : "saved";

  const isOpen = isDesktop ? !!menu && menu !== "main" : !!menu;

  useIsModalOpen(menuModal, {
    onConceal: () => {
      menuStore.send({ type: "setMenu", menu: null });
    },
  });

  return (
    <>
      <MenuModal className={css({ hideFrom: menu === "main" ? "lg" : undefined })} menu={menu} isOpen={isOpen} />
      {headerRef.current
        ? createPortal(
            <Flex
              zIndex="800"
              position="absolute"
              top={{ base: "8px", lg: "0" }}
              right="16px"
              alignItems={{ base: "unset", lg: "center" }}
              h="100%"
            >
              <styled.div hideBelow="lg">
                <Flex alignItems="center">
                  <Status
                    className={css({ display: "flex", alignItems: "center", fontSize: "10px" })}
                    status={status}
                  />
                  <Popover.Root positioning={{ placement: "bottom-end" }}>
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
                        <MenuActions menu={menu} />
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
                  nativeButtonProps={{ onClick: () => menuStore.send({ type: "setMenu", menu: "main" }) }}
                />
              </styled.div>
            </Flex>,
            headerRef.current,
          )
        : null}
    </>
  );
};

const menuModal = createModal({ isOpenedByDefault: false, id: "menu-modal-2" });

const modalContents: Record<NestedMenu, (props: ModalContentProps) => ReactNode> = {
  main: (props) => <MenuActions menu={props.menu} />,
  help: (props) => <HelpMenu {...props} />,
  "clauses-departementales": (props) => <ClauseMenu isNational={false} {...props} />,
  "clauses-nationales": (props) => <ClauseMenu isNational {...props} />,
  share: (props) => <ShareReport {...props} />,
};

export type ModalContentProps = {
  menu: NestedMenu;
  backButtonOnClick: () => void;
};

const MenuModal = ({ menu, isOpen, className }: { menu: NestedMenu | null; isOpen: boolean; className?: string }) => {
  const Component = !!menu ? modalContents[menu] : null;

  return (
    <menuModal.Component
      title={""}
      className={cx(
        className,
        isOpen ? "fr-modal--opened" : "",
        css({
          "& .fr-container": {
            width: "100%",
            maxWidth: "100%",
            height: "100%",
            maxHeight: "100%",
            p: 0,
          },
          "& .fr-grid-row": {
            justifyContent: { base: "center", lg: "flex-end" },
            width: "100%",
            maxWidth: "100%",
            height: "100%",
            maxHeight: "100%",
            p: 0,
          },
          "& .fr-modal__content": {
            pl: 0,
            pr: 0,
          },
          "& .fr-col-12": {
            flex: { base: 1, lg: "unset" },
            width: { base: "100%", lg: "unset" },
            maxWidth: { base: "100%", lg: "unset" },
            height: "100%",
            maxHeight: "100%",
            p: 0,
          },
          "& .fr-modal__title": {
            display: "none",
          },
          "& .fr-modal__body": {
            width: { base: "100%", lg: "800px" },
            maxWidth: "100%",
            height: "100%",
            maxHeight: "100vh !important",
            p: 0,
          },
          "& .fr-modal__header": {
            display: "none",
          },

          "&::before": {
            display: "none",
          },
          "&::after": {
            display: "none",
          },
        }),
      )}
    >
      {Component ? (
        <>
          <Component
            menu={menu!}
            backButtonOnClick={() => (menu === "main" ? undefined : menuStore.send({ type: "setMenu", menu: "main" }))}
          />
          {/* <MenuTitle
            backButtonOnClick={menu === "main" ? undefined : () => menuStore.send({ type: "setMenu", menu: "main" })}
          >
            {modalTitles[menu]}
          </MenuTitle>
          {modalContents[menu]} */}
        </>
      ) : null}
    </menuModal.Component>
  );
};
