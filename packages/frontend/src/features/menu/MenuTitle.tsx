import { ReactNode } from "react";
import { menuActor } from "./menuMachine";
import { Flex } from "#components/ui/Flex.tsx";
import { Box, Typography } from "@mui/material";
import { Button } from "#components/MUIDsfr.tsx";

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
      // mt={{ base: "0", lg: "48px" }}
      // mb={{ base: "16px", lg: "48px" }}
      bgcolor="white"
      zIndex="5"
      position={{ base: "sticky", lg: "sticky" }}
      top={{ base: "0", lg: "0" }}
      justifyContent="space-between"
      alignItems="center"
      width="100%"
      py={{ base: "16px", lg: "30px" }}
      pl={{ base: undefined, lg: "0" }}
    >
      <Box display={{ lg: "none" }}>
        {backButtonOnClick ? (
          <Button priority="tertiary no outline" iconId="ri-arrow-left-s-line" onClick={backButtonOnClick}>
            {null}
          </Button>
        ) : null}
      </Box>
      <Typography
        display={{
          xs: buttons ? "none" : "block",
          lg: "block",
        }}
        pl={backButtonOnClick ? undefined : "16px"}
        textOverflow="ellipsis"
        fontSize="20px"
        fontWeight="bold"
        whiteSpace="nowrap"
        overflow="hidden"
      >
        {children}
      </Typography>
      <Flex
        gap="16px"
        pl={{ base: "16px", lg: "24px" }}
        textOverflow="ellipsis"
        fontSize="20px"
        fontWeight="bold"
        whiteSpace="nowrap"
        overflow="hidden"
      >
        {buttons}
      </Flex>
      <ModalCloseButton onClose={() => menuActor.send({ type: "CLOSE" })} />
    </Flex>
    {alert ? alert : null}
    {!hideDivider ? (
      <Box mb="24px">
        {buttons ? (
          <Typography display={{ lg: "none" }} fontSize="20px" fontWeight="bold">
            {children}
          </Typography>
        ) : null}
      </Box>
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
