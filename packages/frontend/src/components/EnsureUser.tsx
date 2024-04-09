import { Navigate } from "@tanstack/react-router";
import type { PropsWithChildren } from "react";
import { useUser } from "../contexts/AuthContext";
import { useHref } from "../hooks/useHref";

export const EnsureUser = ({ children }: PropsWithChildren) => {
  const user = useUser();
  const href = useHref();

  if (!user) {
    return <Navigate to="/login" search={{ redirect: href }} />;
  }

  return <>{children}</>;
};
