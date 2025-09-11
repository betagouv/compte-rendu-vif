import { Button as DsfrButton } from "@codegouvfr/react-dsfr/Button";
import { Select as DsfrSelect } from "@codegouvfr/react-dsfr/Select";
import { Input as DsfrInput } from "@codegouvfr/react-dsfr/Input";
import { Box, styled } from "@mui/material";

export const Center = styled(Box)({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
});

export const Button = styled(DsfrButton)();
export const Select = styled(DsfrSelect)();
export const Input = styled(DsfrInput)();
