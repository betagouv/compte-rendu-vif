import { ReportSearch } from "#components/ReportSearch.js";
import { css } from "#styled-system/css";
import { Box, Flex, Stack } from "#styled-system/jsx";
import Badge from "@codegouvfr/react-dsfr/Badge";
import Button from "@codegouvfr/react-dsfr/Button";
import Footer from "@codegouvfr/react-dsfr/Footer";
import Header from "@codegouvfr/react-dsfr/Header/Header";
import MuiDsfrThemeProvider from "@codegouvfr/react-dsfr/mui";
import { createRootRouteWithContext, Outlet, useRouter } from "@tanstack/react-router";
import { useRef, type PropsWithChildren } from "react";
import type { RouterOutputs } from "../api";
import { useIsLoggedIn } from "../contexts/AuthContext";
import { useIsDesktop } from "../hooks/useIsDesktop";
import { MenuButton } from "../features/menu/MenuButton";

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

  const isDesktop = useIsDesktop();
  const router = useRouter();

  const isHome = router.latestLocation.pathname === "/";
  const headerRef = useRef<HTMLDivElement>(null);

  return (
    <Flex pos="relative" flexDir={"column"} h="100vh">
      <Header
        ref={headerRef}
        brandTop={
          <>
            Ministère
            <br /> de la culture
          </>
        }
        serviceTitle={
          isDesktop ? (
            <>
              Compte-rendu VIF
              {/* <Badge as="span" noIcon severity="info">
                Beta
              </Badge> */}
            </>
          ) : null
        }
        homeLinkProps={{ title: "Compte rendu vif", to: "/" }}
        quickAccessItems={
          isLoggedIn
            ? undefined
            : [
                ...(isLoggedIn
                  ? []
                  : [
                      <>
                        <Button linkProps={{ to: "/login" }}>Se connecter</Button>
                        <Button linkProps={{ to: "/signup" }}>S'inscrire</Button>
                      </>,
                    ]),
              ]
        }
        renderSearchInput={
          !isDesktop && isHome
            ? (inputProps) => {
                return <ReportSearch inputProps={inputProps} />;
              }
            : undefined
        }
        classes={{
          root: css({
            "& .fr-btn--menu": isLoggedIn
              ? {
                  opacity: "0",
                  pointerEvents: "none",
                }
              : {},
          }),
          toolsLinks: css({
            h: "100%",
          }),
          menuLinks: css({
            "&::after": {
              display: "none",
            },
          }),
          bodyRow: css({
            pos: "relative",
            "& > .fr-header__tools": {
              h: "26px",
            },
          }),
        }}
      />
      {isLoggedIn ? <MenuButton headerRef={headerRef} /> : null}
      {/* <Menu headerRef={headerRef} /> */}

      <Box flex="1">{children}</Box>
      {/* <TanStackRouterDevtools /> */}
      <Footer accessibility="partially compliant" />
    </Flex>
  );
};
