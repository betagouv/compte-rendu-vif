import { useQuery } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { unauthenticatedApi } from "../api";
import { useAuthContext } from "../contexts/AuthContext";
import { get80PercentOfTokenLifespan } from "../ApiStore";

const AuthCallback = () => {
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code")!;

  const navigate = useNavigate();

  const { setAuth } = useAuthContext();

  // authenticate and navigate when done
  useQuery({
    queryKey: ["authenticate", code],
    queryFn: async () => {
      // remove params from url
      window.history.replaceState({}, document.title, window.location.pathname);
      const data = await unauthenticatedApi.post("/api/authenticate", { body: { code } });

      const expiresAt = get80PercentOfTokenLifespan(Number(data.tokens.expires_in));

      setAuth({
        accessToken: data.tokens.access_token,
        expiresAt: new Date(expiresAt).toISOString(),
        refreshToken: data.tokens.refresh_token,
        user: data.user,
      });

      navigate({ to: "/" });
    },
    enabled: !!code,
  });

  return <div>Authentification en cours...</div>;
};

export const Route = createFileRoute("/auth-callback")({
  component: AuthCallback,
});
