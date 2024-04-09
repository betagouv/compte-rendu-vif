import Badge from "@codegouvfr/react-dsfr/Badge";
import Footer from "@codegouvfr/react-dsfr/Footer";
import Header from "@codegouvfr/react-dsfr/Header/Header";
import MuiDsfrThemeProvider from "@codegouvfr/react-dsfr/mui";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import type { PropsWithChildren } from "react";
import { useIsLoggedIn, useLogout } from "../contexts/AuthContext";
import { Box, Flex } from "#styled-system/jsx";
import type { RouterOutputs } from "../api";

export const Route = createRootRouteWithContext<Partial<RouterOutputs<"/api/login">>>()({
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
    <Flex flexDir={"column"} h="100vh">
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
        homeLinkProps={{ title: "Compte rendu vif", to: "/" }}
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
                {
                  text: "Connexion",
                  iconId: "ri-account-circle-line" as const,
                  linkProps: { to: "/login" },
                },
                {
                  text: "Inscription",
                  iconId: "fr-icon-add-circle-line" as const,
                  linkProps: { to: "/signup" },
                },
              ]),
        ]}
      />
      <Box flex="1">{children}</Box>
      <TanStackRouterDevtools />
      <Footer accessibility="partially compliant" />
    </Flex>
  );
};
