import { useMedia } from "react-use";
import { token } from "#styled-system/tokens";

export const useIsDesktop = () => {
  return useMedia(`(min-width: ${token("breakpoints.lg")})`);
};

export const useIsXL = () => {
  return useMedia(`(min-width: ${token("breakpoints.xl")})`);
};
