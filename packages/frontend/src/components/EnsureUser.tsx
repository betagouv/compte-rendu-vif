import { Navigate } from "@tanstack/react-router";
import type { PropsWithChildren } from "react";
import { useAuthContext, useUser } from "../contexts/AuthContext";

export const EnsureUser = ({ children }: PropsWithChildren) => {
  const user = useUser();

  if (!user) {
    const href = window.location.pathname;
    return <Navigate to="/login" search={{ redirect: href }} />;
  }

  return <>{children}</>;
};
