import MuiDsfrThemeProvider from "@codegouvfr/react-dsfr/mui";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import type { RouterOutputs } from "../api";
import { Layout } from "../features/Layout";

export const Route = createRootRouteWithContext<Partial<RouterOutputs<"/api/authenticate">>>()({
  beforeLoad: (ctx) => {
    document.title = getTitle(ctx.location.pathname);
  },
  component: () => (
    <>
      <MuiDsfrThemeProvider>
        <Layout>
          <Outlet />
        </Layout>
      </MuiDsfrThemeProvider>
    </>
  ),
});

const getTitle = (pathname: string) => {
  if (pathname.startsWith("/edit/")) {
    return "Compte rendu | CR VIF";
  }

  if (pathname.startsWith("/pdf")) {
    return "PDF | CR VIF";
  }

  if (pathname.startsWith("/login")) {
    return "Connexion | CR VIF";
  }

  if (pathname.startsWith("/signup")) {
    return "Inscription | CR VIF";
  }

  return "CR VIF";
};
