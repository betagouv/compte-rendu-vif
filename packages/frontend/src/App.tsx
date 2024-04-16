import { ReactNode, RouterProvider, createRouter } from "@tanstack/react-router";
import { useAuthContext } from "./contexts/AuthContext";
import { routeTree } from "./routeTree.gen";
import { QueryKey, UseQueryOptions, useQuery } from "@tanstack/react-query";

export const App = () => {
  const [auth] = useAuthContext();
  // return (
  //   <QueryComponent
  //     queryFn={randomPromise}
  //     queryKey={["random"]}
  //     renderData={(data) => `${data.join(" ")} !`}
  //     renderError={(error) => <div>An error has occured</div>}
  //     renderLoading={() => <div>Loading...</div>}
  //   />
  // );
  return <RouterProvider router={router} context={auth} />;
};

const randomPromise = () => new Promise<string[]>((resolve) => setTimeout(() => resolve(["hello", "world"]), 1000));

const router = createRouter({
  routeTree,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export function QueryComponent<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>({
  renderData,
  renderError,
  renderLoading,
  ...queryOptions
}: UseQueryOptions<TQueryFnData, TError, TData, TQueryKey> & {
  renderData: (data: TData) => ReactNode;
  renderError: (error: TError) => ReactNode;
  renderLoading: () => ReactNode;
}) {
  const query = useQuery(queryOptions);

  if (query.isError) {
    return renderError(query.error);
  }

  if (query.isLoading) {
    return renderLoading();
  }

  return renderData(query.data);
}
