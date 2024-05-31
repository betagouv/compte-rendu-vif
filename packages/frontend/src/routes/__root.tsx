import Badge from "@codegouvfr/react-dsfr/Badge";
import Footer from "@codegouvfr/react-dsfr/Footer";
import Header from "@codegouvfr/react-dsfr/Header/Header";
import MuiDsfrThemeProvider from "@codegouvfr/react-dsfr/mui";
import { createRootRouteWithContext, Outlet, useNavigate, useRouter } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import type { PropsWithChildren } from "react";
import { useIsLoggedIn, useLogout, useUser } from "../contexts/AuthContext";
import { Box, Flex, Stack } from "#styled-system/jsx";
import type { RouterOutputs } from "../api";
import { css, cx } from "#styled-system/css";
import { useIsDesktop } from "../hooks/useIsDesktop";
import { ReportSearch } from "#components/ReportSearch.js";
import { electric } from "../db";

export const Route = createRootRouteWithContext<Partial<RouterOutputs<"/api/login">>>()({
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

const Layout = ({ children }: PropsWithChildren) => {
  const isLoggedIn = useIsLoggedIn();
  const logout = useLogout();

  const isDesktop = useIsDesktop();
  const router = useRouter();

  const user = useUser();
  console.log(user);

  const isHome = router.latestLocation.pathname === "/";

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
          isDesktop ? (
            <>
              Compte-rendu VIF{" "}
              <Badge as="span" noIcon severity="warning">
                WiP
              </Badge>
            </>
          ) : null
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
                {
                  iconId: "fr-icon-warning-fill" as const,
                  text: "Supprimer les données locales",
                  buttonProps: {
                    onClick: () => {
                      if (electric.isConnected) electric.disconnect();
                      localStorage.clear();
                      indexedDB.deleteDatabase("crvif.db");
                      window.location.reload();
                    },
                  },
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
        renderSearchInput={
          !isDesktop && isHome
            ? (inputProps) => {
                return <ReportSearch inputProps={inputProps} />;
              }
            : undefined
        }
      />
      <Box flex="1">{children}</Box>
      {/* <TanStackRouterDevtools /> */}
      <Footer accessibility="partially compliant" />
    </Flex>
  );
};
