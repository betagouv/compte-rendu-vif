import { Navigate } from "@tanstack/react-router";
import type { PropsWithChildren } from "react";
import { useUser } from "../contexts/AuthContext";

export const EnsureUser = ({ children }: PropsWithChildren) => {
  const user = useUser();
  const href = window.location.pathname;

  if (!user) {
    return <Navigate to="/login" search={{ redirect: href }} />;
  }

  return <>{children}</>;
};
