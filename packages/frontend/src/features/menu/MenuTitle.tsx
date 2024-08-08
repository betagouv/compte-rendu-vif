import { Divider, Flex, styled } from "#styled-system/jsx";
import Button from "@codegouvfr/react-dsfr/Button";
import { ReactNode } from "react";
import { menuStore } from "./menuStore";

export const MenuTitle = ({
  children,
  backButtonOnClick,
  buttons,
  hideDivider,
  alert,
}: {
  children: ReactNode;
  backButtonOnClick?: () => void;
  buttons?: ReactNode;
  hideDivider?: boolean;
  alert?: ReactNode;
}) => (
  <>
    <Flex
      position={{ base: "sticky", lg: "unset" }}
      top={{ base: "-1px", lg: "unset" }}
      justifyContent="space-between"
      alignItems="center"
      w="100%"
      py={{ base: "16px", lg: "30px" }}
      // mt={{ base: "0", lg: "48px" }}
      // mb={{ base: "16px", lg: "48px" }}
      bgColor="white"
    >
      <styled.div hideFrom="lg">
        {backButtonOnClick ? (
          // @ts-ignore
          <Button priority="tertiary no outline" iconId="ri-arrow-left-s-line" onClick={backButtonOnClick}></Button>
        ) : null}
      </styled.div>
      <styled.span
        hideBelow={buttons ? "lg" : undefined}
        pl={backButtonOnClick ? undefined : "16px"}
        fontSize="20px"
        fontWeight="bold"
        nowrap
      >
        {children}
      </styled.span>
      <Flex gap="16px" pl={{ base: "0", lg: "24px" }} fontSize="20px" fontWeight="bold" nowrap>
        {buttons}
      </Flex>
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
    {alert ? alert : null}
    {!hideDivider ? (
      <styled.div hideFrom="lg" mb="24px">
        {buttons ? (
          <styled.span hideFrom={"lg"} fontSize="20px" fontWeight="bold" nowrap>
            {children}
          </styled.span>
        ) : null}
      </styled.div>
    ) : null}
  </>
);
