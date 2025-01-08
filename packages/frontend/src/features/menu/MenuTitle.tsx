import { Divider, Flex, styled } from "#styled-system/jsx";
import Button from "@codegouvfr/react-dsfr/Button";
import { ReactNode } from "react";
import { menuActor } from "./menuMachine";

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
      zIndex="5"
      position={{ base: "sticky", lg: "sticky" }}
      top={{ base: "0", lg: "0" }}
      justifyContent="space-between"
      alignItems="center"
      w="100%"
      py={{ base: "16px", lg: "30px" }}
      pl={{ base: undefined, lg: "16px" }}
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
      <Flex gap="16px" pl={{ base: "16px", lg: "24px" }} fontSize="20px" fontWeight="bold" nowrap>
        {buttons}
      </Flex>
      <ModalCloseButton onClose={() => menuActor.send({ type: "CLOSE" })} />
    </Flex>
    {alert ? alert : null}
    {!hideDivider ? (
      <styled.div mb="24px">
        {buttons ? (
          <styled.span hideFrom={"lg"} fontSize="20px" fontWeight="bold">
            {children}
          </styled.span>
        ) : null}
      </styled.div>
    ) : null}
  </>
);

export const ModalCloseButton = ({ onClose }: { onClose: () => void }) => {
  return (
    <button
      className="fr-btn--close fr-btn"
      title="Fermer"
      type="button"
      data-fr-js-modal-button="true"
      onClick={onClose}
    >
      Fermer
    </button>
  );
};
