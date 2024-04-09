import { Navigate } from "@tanstack/react-router";
import type { PropsWithChildren } from "react";
import { useUser } from "../contexts/AuthContext";
import { getDefaultRedirectUrl } from "../utils";

export const RedirectIfUser = ({ children }: PropsWithChildren) => {
  const user = useUser();

  if (user) {
    return <Navigate to={getDefaultRedirectUrl()} />;
  }
  return <>{children}</>;
};
