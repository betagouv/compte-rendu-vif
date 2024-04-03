import { PropsWithChildren, createContext } from "react";
import { useAuthContext } from "./AuthContext";
import { useMutation, useQuery } from "@tanstack/react-query";
import { electric } from "../db";
import { Redirect, useNavigate, useRouter } from "@tanstack/react-router";
import { useHref } from "../hooks/useHref";

export const ElectricProvider = ({ children }: PropsWithChildren) => {
  const [auth] = useAuthContext();
  const navigate = useNavigate();

  const href = useHref();

  const query = useQuery({
    queryKey: ["electric", auth.token!],
    queryFn: () => electric.connect(auth.token!),
    enabled: !!auth.token,
    refetchOnWindowFocus: false,
  });

  if (query.isError) {
    navigate({ to: "/login", search: { redirect: href } });
    return null;
  }

  if (query.isLoading) {
    return <div>Loading</div>;
  }

  return <>{children}</>;
};
