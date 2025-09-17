import { useMedia } from "react-use";
import { fr } from "@codegouvfr/react-dsfr";

const breakpoints = fr.breakpoints.getPxValues();

export const useIsDesktop = () => {
  return useMedia(`(min-width: ${breakpoints.lg}px)`);
};

export const useIsXL = () => {
  return useMedia(`(min-width: ${breakpoints.xl}px)`);
};
