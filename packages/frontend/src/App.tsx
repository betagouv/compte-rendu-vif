import { RouterProvider, createRouter } from "@tanstack/react-router";
import { useAuthContext } from "./contexts/AuthContext";
import { routeTree } from "./routeTree.gen";
import { useEffect } from "react";

export const App = () => {
  const [auth] = useAuthContext();

  useEffect(() => {
    setTimeout(async () => {
      console.log("go");
      const registration = await navigator.serviceWorker.ready;
      const result = await registration.sync.register("images");
      console.log(result);
    }, 2000);
  }, []);

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
