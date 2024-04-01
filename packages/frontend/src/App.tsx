import { RouterProvider, createRouter } from "@tanstack/react-router";
import { useAuthContext } from "./contexts/AuthContext";
import { routeTree } from "./routeTree.gen";

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
