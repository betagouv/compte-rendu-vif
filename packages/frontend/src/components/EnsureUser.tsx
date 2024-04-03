import { PropsWithChildren } from "react";
import { useAuthContext, useUser } from "../contexts/AuthContext";
import { Navigate, useNavigate } from "@tanstack/react-router";
import { useHref } from "../hooks/useHref";

export const EnsureUser = ({ children }: PropsWithChildren) => {
  const user = useUser();
  const href = useHref();

  if (!user) {
    return <Navigate to="/login" search={{ redirect: href }} />;
  }

  return <>{children}</>;
};
