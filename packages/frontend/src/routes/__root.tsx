import Badge from "@codegouvfr/react-dsfr/Badge";
import Footer from "@codegouvfr/react-dsfr/Footer";
import Header, { HeaderProps } from "@codegouvfr/react-dsfr/Header/Header";
import MuiDsfrThemeProvider from "@codegouvfr/react-dsfr/mui";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { PropsWithChildren } from "react";
import { useAuthContext, useIsLoggedIn, useLogout } from "../contexts/AuthContext";

export const Route = createRootRoute({
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

const Layout = ({ children }: PropsWithChildren) => {
  const isLoggedIn = useIsLoggedIn();
  const logout = useLogout();

  return (
    <>
      <Header
        brandTop={
          <>
            Ministère
            <br /> de la culture
          </>
        }
        serviceTitle={
          <>
            Compte-rendu VIF{" "}
            <Badge as="span" noIcon severity="warning">
              WiP
            </Badge>
          </>
        }
        homeLinkProps={{ title: "Compte rendu vif", href: "/" }}
        quickAccessItems={[
          ...(isLoggedIn
            ? [
                {
                  iconId: "fr-icon-logout-box-r-line" as const,
                  text: "Se déconnecter",
                  buttonProps: { onClick: logout },
                },
              ]
            : [
                { text: "Connexion", iconId: "ri-account-box-line" as const, linkProps: { href: "/login" } },
                { text: "Inscription", iconId: "fr-icon-add-circle-line" as const, linkProps: { href: "/signup" } },
              ]),
        ]}
      />
      {children}
      <TanStackRouterDevtools />
      <Footer accessibility="partially compliant" />
    </>
  );
};
