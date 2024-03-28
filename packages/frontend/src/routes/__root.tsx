import Header from "@codegouvfr/react-dsfr/Header/Header";
import MuiDsfrThemeProvider from "@codegouvfr/react-dsfr/mui";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { ElectricWrapper } from "../ElectricWrapper";

export const Route = createRootRoute({
  component: () => (
    <ElectricWrapper>
      <MuiDsfrThemeProvider>
        <Header
          brandTop={
            <>
              Ministère
              <br /> de la culture
            </>
          }
          homeLinkProps={{ title: "Compte rendu vif", href: "/" }}
        />
        <Outlet />
        <TanStackRouterDevtools />
      </MuiDsfrThemeProvider>
    </ElectricWrapper>
  ),
});
