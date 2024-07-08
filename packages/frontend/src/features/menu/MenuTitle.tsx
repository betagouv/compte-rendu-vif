import { Divider, Flex, styled } from "#styled-system/jsx";
import Button from "@codegouvfr/react-dsfr/Button";
import { ReactNode } from "react";
import { menuStore } from "./menuStore";

export const MenuTitle = ({
  children,
  backButtonOnClick,
  buttons,
  hideDivider,
}: {
  children: ReactNode;
  backButtonOnClick?: () => void;
  buttons?: ReactNode;
  hideDivider?: boolean;
}) => (
  <>
    <Flex justifyContent="space-between" alignItems="center" w="100%" h="40px">
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
      <styled.div pl={{ base: "0", lg: "10px" }} fontSize="20px" fontWeight="bold" nowrap>
        {buttons}
      </styled.div>
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
    {!hideDivider ? (
      <>
        <Divider height="2px" my={{ base: "27px", lg: "44px" }} color="#C1C1FB" />
        {buttons ? (
          <styled.span hideFrom={"lg"} fontSize="20px" fontWeight="bold" nowrap>
            {children}
          </styled.span>
        ) : null}
      </>
    ) : null}
  </>
);
