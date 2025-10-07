import { useMutation, useQuery } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { unauthenticatedApi } from "../api";
import { useAuthContext } from "../contexts/AuthContext";

const AuthCallback = () => {
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code")!;

  const navigate = useNavigate();

  const [_, setData] = useAuthContext();
  console.log(_);
  const authenticateQuery = useQuery({
    queryKey: ["authenticate", code],
    queryFn: () => {
      // remove params from url
      window.history.replaceState({}, document.title, window.location.pathname);
      return unauthenticatedApi.post("/api/authenticate", { body: { code } });
    },
    onSuccess: (data) => {
      console.log(data);
      setData(data);
      navigate({ to: "/" });
    },
    enabled: !!code,
  });

  return <div>Authentification en cours...</div>;
};

export const Route = createFileRoute("/auth-callback")({
  component: AuthCallback,
});
