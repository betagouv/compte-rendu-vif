import { PropsWithChildren } from "react";
import { useUser } from "../contexts/AuthContext";
import { Navigate, useNavigate, useRouter } from "@tanstack/react-router";
import { getDefaultRedirectUrl } from "../utils";

export const RedirectIfUser = ({ children }: PropsWithChildren) => {
  const user = useUser();

  if (user) {
    return <Navigate to={getDefaultRedirectUrl()} />;
  }
  return <>{children}</>;
};
