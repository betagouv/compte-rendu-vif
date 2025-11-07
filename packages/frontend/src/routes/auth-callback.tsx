import { useQuery } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { unauthenticatedApi, AuthUser } from "../api";
import { useAuthContext } from "../contexts/AuthContext";
import { get80PercentOfTokenLifespan } from "../ApiStore";
import { Alert, Button, Center } from "#components/MUIDsfr.tsx";
import { Spinner } from "#components/Spinner.tsx";

const AuthCallback = () => {
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code")!;

  const navigate = useNavigate();

  const { setAuth } = useAuthContext();

  // authenticate and navigate when done
  const authenticateQuery = useQuery({
    queryKey: ["authenticate", code],
    retry: false,
    refetchOnWindowFocus: false,
    queryFn: async () => {
      const data = await unauthenticatedApi.post("/api/authenticate", { body: { code } });

      const expiresAt = get80PercentOfTokenLifespan(Number(data.tokens.expires_in));

      setAuth({
        accessToken: data.tokens.access_token,
        expiresAt: new Date(expiresAt).toISOString(),
        refreshToken: data.tokens.refresh_token,
        user: data.user as AuthUser,
      });

      // remove params from url
      window.history.replaceState({}, document.title, window.location.pathname);
      navigate({ to: "/", search: { document: "constats" } });
    },
    enabled: !!code,
  });

  return (
    <Center height="100%" flexDirection="column">
      {authenticateQuery.isLoading ? <Spinner /> : null}
      {authenticateQuery.isError ? (
        <Center flexDirection="column">
          <Alert severity="error" title="Une erreur s'est produite lors de l'authentification." />
          <Button sx={{ mt: "16px" }}>Réessayer</Button>
        </Center>
      ) : null}
    </Center>
  );
};

export const Route = createFileRoute("/auth-callback")({
  component: AuthCallback,
});
