import { Popover } from "#components/Popover";
import { ReportSearch } from "#components/ReportSearch.js";
import { css } from "#styled-system/css";
import { Box, Center, Divider, Flex, Stack, styled } from "#styled-system/jsx";
import Badge from "@codegouvfr/react-dsfr/Badge";
import Button from "@codegouvfr/react-dsfr/Button";
import Footer from "@codegouvfr/react-dsfr/Footer";
import Header from "@codegouvfr/react-dsfr/Header/Header";
import MuiDsfrThemeProvider from "@codegouvfr/react-dsfr/mui";
import { createRootRouteWithContext, Outlet, useRouter } from "@tanstack/react-router";
import { useRef, type PropsWithChildren } from "react";
import type { RouterOutputs } from "../api";
import { useIsLoggedIn, useLogout } from "../contexts/AuthContext";
import { electric } from "../db";
import { useIsDesktop } from "../hooks/useIsDesktop";

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

  return (
    <Flex pos="relative" flexDir={"column"} h="100vh">
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
            ? [<LoggedInQuickAccessItems />]
            : [
                <Stack className={actionsContainerClassName}>
                  <Button linkProps={{ to: "/login" }}>Se connecter</Button>
                  <Button linkProps={{ to: "/signup" }}>S'inscrire</Button>
                </Stack>,
              ]),
        ]}
        renderSearchInput={
          !isDesktop && isHome
            ? (inputProps) => {
                return <ReportSearch inputProps={inputProps} />;
              }
            : undefined
        }
        classes={{
          toolsLinks: css({ h: "100%" }),
          bodyRow: css({
            "& > .fr-header__tools": {
              h: "26px",
            },
          }),
        }}
      />

      <Box flex="1">{children}</Box>
      {/* <TanStackRouterDevtools /> */}
      <Footer accessibility="partially compliant" />
    </Flex>
  );
};

export const LoggedInQuickAccessItems = () => {
  const ref = useRef<HTMLAnchorElement>(null);

  return (
    <>
      <styled.div hideBelow="lg">
        <Popover.Root>
          <Popover.Trigger asChild>
            <Button ref={ref as any} priority="tertiary" iconId="fr-icon-account-circle-fill">
              Mon compte
            </Button>
          </Popover.Trigger>
          <Popover.Positioner>
            <Popover.Content borderRadius="0">
              <MyAccountDesktop />
            </Popover.Content>
          </Popover.Positioner>
        </Popover.Root>
      </styled.div>
      <styled.div hideFrom="lg">
        <MyAccountDesktop />
      </styled.div>
    </>
  );
};

const actionsContainerClassName = css({
  gap: "0",
  "& > button": {
    h: "48px",
    m: 0,
    color: "black",
    fontSize: "14px",
    "&:disabled": {
      color: "text-disabled-grey",
    },
  },
});

const MyAccountDesktop = () => {
  const logout = useLogout();
  const deleteLocalData = () => {
    if (electric.isConnected) electric.disconnect();
    localStorage.clear();
    indexedDB.deleteDatabase("crvif.db");
    window.location.reload();
  };

  const actions = [
    { text: "Partage des CR", onClick: () => {}, disabled: true },
    { text: "Clauses départementales", onClick: () => {}, disabled: true },
    { text: "Clauses nationales", onClick: () => {}, disabled: true },
    { text: "Se déconnecter", onClick: logout },
    { text: "Supprimer les données locales", onClick: deleteLocalData },
  ];

  return (
    <Stack className={actionsContainerClassName}>
      {actions.map(({ text, onClick, disabled }, index) => (
        <>
          <Button disabled={disabled} onClick={onClick}>
            {text}
          </Button>
          {index < actions.length - 1 && (
            <Center>
              <Divider w="85%" />
            </Center>
          )}
        </>
      ))}
    </Stack>
  );
};
