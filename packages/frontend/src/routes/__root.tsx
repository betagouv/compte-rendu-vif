import { ReportSearch } from "#components/ReportSearch.js";
import { css } from "#styled-system/css";
import { Box, Flex, styled } from "#styled-system/jsx";
import Badge from "@codegouvfr/react-dsfr/Badge";
import Button from "@codegouvfr/react-dsfr/Button";
import Header from "@codegouvfr/react-dsfr/Header/Header";
import MuiDsfrThemeProvider from "@codegouvfr/react-dsfr/mui";
import { createRootRouteWithContext, Outlet, useRouter } from "@tanstack/react-router";
import { useRef, type PropsWithChildren } from "react";
import type { RouterOutputs } from "../api";
import { useIsLoggedIn } from "../contexts/AuthContext";
import { MenuButton } from "../features/menu/MenuButton";
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
              Compte-rendu VIF{" "}
              <Badge as="span" noIcon severity="success">
                Beta
              </Badge>
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
          logo: css({
            "&::after": {
              backgroundPosition: "0 0 !important",
            },
          }),
          service: css({ display: { base: "none", lg: "unset" } }),
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

      <AppFooter />
      {/* <VersionDisplay /> */}
    </Flex>
  );
};

const AppFooter = () => {
  return (
    <footer id="fr-footer" className="fr-footer" role="contentinfo" style={{ border: "none", borderBottomWidth: 0 }}>
      <div className="fr-container">
        <div className="fr-footer__body">
          <div className="fr-footer__brand fr-enlarge-link">
            <a className="active" title="Compte rendu vif" href="/" data-status="active">
              <p className="fr-logo">
                Ministère
                <br /> de la culture
              </p>
            </a>
          </div>
          <div className="fr-footer__content">
            <ul className="fr-footer__content-list">
              <li className="fr-footer__content-item">
                <a
                  className="fr-footer__content-link"
                  target="_blank"
                  href="https://legifrance.gouv.fr"
                  title="legifrance.gouv.fr - ouvre une nouvelle fenêtre"
                >
                  legifrance.gouv.fr
                </a>
              </li>
              <li className="fr-footer__content-item">
                <a
                  className="fr-footer__content-link"
                  target="_blank"
                  href="https://gouvernement.fr"
                  title="gouvernement.fr - ouvre une nouvelle fenêtre"
                >
                  gouvernement.fr
                </a>
              </li>
              <li className="fr-footer__content-item">
                <a
                  className="fr-footer__content-link"
                  target="_blank"
                  href="https://service-public.fr"
                  title="service-public.fr - ouvre une nouvelle fenêtre"
                >
                  service-public.fr
                </a>
              </li>
              <li className="fr-footer__content-item">
                <a
                  className="fr-footer__content-link"
                  target="_blank"
                  href="https://data.gouv.fr"
                  title="data.gouv.fr - ouvre une nouvelle fenêtre"
                >
                  data.gouv.fr
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="fr-footer__bottom">
          <ul className="fr-footer__bottom-list">
            <li className="fr-footer__bottom-item">
              <span className="fr-footer__bottom-link">Accessibilité: partiellement conforme</span>
            </li>
          </ul>

          <Flex flexDir="column">
            <VersionDisplay />
            <div className="fr-footer__bottom-copy">
              <p>
                Sauf mention explicite de propriété intellectuelle détenue par des tiers, les contenus de ce site sont
                proposés sous{" "}
                <a
                  href="https://github.com/etalab/licence-ouverte/blob/master/LO.md"
                  target="_blank"
                  title="licence etalab-2.0 - ouvre une nouvelle fenêtre"
                >
                  licence etalab-2.0
                </a>
              </p>
            </div>
          </Flex>
        </div>
      </div>
    </footer>
  );
};

export const VersionDisplay = () => {
  const version = window.APP_VERSION;

  if (!version) return null;
  return (
    <div className="fr-footer__bottom-copy">
      <styled.p mb="10px">Version {version}</styled.p>
    </div>
  );
};
