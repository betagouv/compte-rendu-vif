import { Navigate } from "@tanstack/react-router";
import type { PropsWithChildren } from "react";
import { useAuthContext, useUser } from "../contexts/AuthContext";

export const EnsureUser = ({ children }: PropsWithChildren) => {
  const user = useUser();
  const href = window.location.pathname;
  const { auth } = useAuthContext();

  if (!user) {
    console.log("no user");
    return <Navigate to="/login" search={{ redirect: href }} />;
  }

  return <>{children}</>;
};
