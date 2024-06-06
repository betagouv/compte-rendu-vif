import { Flex } from "#styled-system/jsx";
import { createPortal } from "react-dom";
import { MyAccountMenu, MyAccountMenuActions, menuModal } from "./MyAccountMenu";
import { css } from "#styled-system/css";
import { drawerMenu } from "./MenuDrawer";
import { useEffect } from "react";

export const Menu = ({ headerRef }: { headerRef: React.RefObject<HTMLElement> }) => {
  const headerBody = headerRef.current?.getElementsByClassName("fr-header__body-row")?.[0];

  useEffect(() => {
    setTimeout(() => {
      drawerMenu.open();
    }, 1000);
  }, []);

  if (!headerBody) return null;

  return (
    <>
      <drawerMenu.Component
        title=""
        className={css({
          display: "flex",
          justifyContent: "flex-start !important",
          alignItems: "flex-end !important",
          width: "100%",
          height: "100%",
          "& .fr-container": {
            maxWidth: "initial !important",
            height: "100%",
            maxHeight: "100%",
            p: 0,
          },
          "& .fr-grid-row": {
            height: "100%",
            maxHeight: "100%",
            p: 0,
          },
          "& .fr-col-12": {
            flex: 1,
            height: "100%",
            maxHeight: "100%",
            p: 0,
          },
          "& .fr-modal__body": {
            height: "100%",
            maxHeight: "100vh !important",
            p: 0,
          },
          "&::before, &::after": {
            display: "none",
          },
        })}
      >
        Salut à tous
      </drawerMenu.Component>
      <menuModal.Component
        className={css({
          hideFrom: "lg",
          "& .fr-container": {
            width: "100%",
            maxWidth: "100%",
            height: "100%",
            maxHeight: "100%",
            p: 0,
          },
          "& .fr-grid-row": {
            width: "100%",
            maxWidth: "100%",
            height: "100%",
            maxHeight: "100%",
            p: 0,
          },
          "& .fr-col-12": {
            flex: 1,
            width: "100%",
            maxWidth: "100%",
            height: "100%",
            maxHeight: "100%",
            p: 0,
          },
          "& .fr-modal__body": {
            width: { base: "100%", lg: "600px" },
            maxWidth: "100%",
            height: "100%",
            maxHeight: "100vh !important",
            p: 0,
          },

          "&::before": {
            display: "none",
          },
          "&::after": {
            display: "none",
          },
        })}
        title=""
      >
        <MyAccountMenuActions />
      </menuModal.Component>
      {createPortal(
        <Flex
          zIndex="800"
          position="absolute"
          top={{ base: "8px", lg: "0" }}
          right={{ base: "16px", lg: "0" }}
          alignItems={{ base: "unset", lg: "center" }}
          h="100%"
        >
          <MyAccountMenu />
        </Flex>,
        headerBody,
      )}
    </>
  );
};
