import { LinkProps, RouterProvider, createRouter } from "@tanstack/react-router";
import { useAuthContext } from "./contexts/AuthContext";
import { routeTree } from "./routeTree.gen";
import { RegisteredLinkProps } from "@codegouvfr/react-dsfr/link";

export const App = () => {
  const [auth] = useAuthContext();

  return <RouterProvider router={router} context={auth} />;
};

const router = createRouter({
  routeTree,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
