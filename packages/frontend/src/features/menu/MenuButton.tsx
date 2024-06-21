import { Popover } from "#components/Popover";
import { Status } from "#components/SyncForm";
import { css, cx } from "#styled-system/css";
import { Flex, styled } from "#styled-system/jsx";
import Button from "@codegouvfr/react-dsfr/Button";
import { createModal } from "@codegouvfr/react-dsfr/Modal";
import { ReactNode } from "react";
import { useIsModalOpen } from "@codegouvfr/react-dsfr/Modal/useIsModalOpen";

import { useSelector } from "@xstate/store/react";
import { createPortal } from "react-dom";
import { useIsDesktop } from "../../hooks/useIsDesktop";
import { ClauseMenu } from "./ClauseMenu";
import { HelpMenu } from "./HelpMenu";
import { MenuActions } from "./MenuActions";
import { menuStore } from "./menuStore";
import { ShareReport } from "./Share";

const nestedMenus = ["main", "help", "clauses-nationales", "clauses-departementales", "share"] as const;
export type NestedMenu = (typeof nestedMenus)[number];

export const MenuButton = ({ headerRef }: { headerRef: any }) => {
  const menu = useSelector(menuStore, (state) => state.context.menu);
  const isDesktop = useIsDesktop();

  const isOpen = isDesktop ? !!menu && menu !== "main" : !!menu;

  useIsModalOpen(menuModal, {
    onConceal: () => menuStore.send({ type: "setMenu", menu: null }),
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
                  <Status className={css({ display: "flex", alignItems: "center", fontSize: "10px" })} />
                  <Popover.Root positioning={{ placement: "bottom-end" }} onOpenChange={(e) => {}}>
                    <Popover.Trigger asChild>
                      <Button
                        className={css({ ml: "16px", mb: "0" })}
                        priority="tertiary"
                        iconId="fr-icon-account-circle-fill"
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

const modalTitles: Record<NestedMenu, string> = {
  main: "Mon compte",
  help: "Assistance technique",
  "clauses-departementales": "Clauses départementales",
  "clauses-nationales": "Clauses nationales",
  share: "Partage des CR",
};

const modalContents: Record<NestedMenu, ReactNode> = {
  main: <MenuActions />,
  help: <HelpMenu />,
  "clauses-departementales": <ClauseMenu isNational={false} />,
  "clauses-nationales": <ClauseMenu isNational />,
  share: <ShareReport />,
};

const MenuModal = ({ menu, isOpen, className }: { menu: NestedMenu | null; isOpen: boolean; className?: string }) => {
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
          "& .fr-col-12": {
            flex: { base: 1, lg: "unset" },
            width: { base: "100%", lg: "unset" },
            maxWidth: { base: "100%", lg: "unset" },
            height: "100%",
            maxHeight: "100%",
            p: 0,
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
      {menu === null ? null : (
        <>
          <MenuTitle
            backButtonOnClick={menu === "main" ? undefined : () => menuStore.send({ type: "setMenu", menu: "main" })}
          >
            {modalTitles[menu]}
          </MenuTitle>
          {modalContents[menu]}
        </>
      )}
    </menuModal.Component>
  );
};

const MenuTitle = ({ children, backButtonOnClick }: { children: ReactNode; backButtonOnClick?: () => void }) => (
  <Flex justifyContent="space-between" alignItems="center" w="100%" h="40px">
    <styled.div hideFrom="lg">
      {backButtonOnClick ? (
        // @ts-ignore
        <Button priority="tertiary no outline" iconId="ri-arrow-left-s-line" onClick={backButtonOnClick}></Button>
      ) : null}
    </styled.div>
    <styled.span pl={backButtonOnClick ? undefined : "16px"} fontSize="20px" fontWeight="bold" nowrap>
      {children}
    </styled.span>
    <button
      className="fr-btn--close fr-btn"
      title="Fermer"
      aria-controls="menu-modal-2"
      type="button"
      data-fr-js-modal-button="true"
      onClick={() => menuStore.send({ type: "setMenu", menu: null })}
    >
      Fermer
    </button>
  </Flex>
);
