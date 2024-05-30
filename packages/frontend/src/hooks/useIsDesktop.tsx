import { useMedia } from "react-use";
import { token } from "#styled-system/tokens";

export const useIsDesktop = () => {
  return useMedia(`(min-width: ${token("breakpoints.lg")})`);
};
