import { Center, Flex, styled } from "#styled-system/jsx";
import { createLazyFileRoute } from "@tanstack/react-router";
import { LoginForm } from "../components/LoginForm";
import { trpc } from "../api";
import { useEffect } from "react";
import { repo } from "../db";
import { AutomergeUrl } from "@automerge/automerge-repo";
import Button from "@codegouvfr/react-dsfr/Button";
import * as Y from "yjs";
import { HocuspocusProvider } from "@hocuspocus/provider";
import { ENV } from "../envVars";

const provider = new HocuspocusProvider({
  url: ENV.VITE_WS_URL,
  name: "example-document",
});

const reports = provider.document.getArray("reports");

reports.observe((event) => {
  console.log(event);
});

reports.push([{ name: "salut" }]);

const LoginPage = () => {
  // const repoId = "automerge:aUh5StGvbgp6yupwW4JpTejB2f2";
  // const repoIdQuery = trpc.getOrCreateRepo.useQuery({ repoId });

  //repoIdQuery.data || (localStorage.getItem("repoId") as AutomergeUrl | undefined);
  // console.log(repoIdQuery.data);

  useEffect(() => {
    console.log(reports.toJSON());

    setTimeout(() => {
      console.log(reports.toJSON());
    }, 2000);
    // const repoId = localStorage.getItem("repoId") as AutomergeUrl | undefined;
    // if (!repoId) return;
    // const handle = repo.find<{ name: string }>(repoId);
    // handle.on("change", (payload) => {
    //   console.log("change", payload);
    // });
    // handle.whenReady(["ready"]).then(() => {
    //   handle.change((doc) => {
    //     doc.age = 21;
    //   });
    //   console.log("ready");
    // });
    // console.log(handle);
  }, []);

  const createCr = () => {
    // const handle = repo.create<{ name: string }>({ name: "salut3" });
    // localStorage.setItem("repoId", handle.url);
    // console.log(handle);
  };

  // useEffect(() => {
  //   if (!repoId) return;
  //   localStorage.setItem("repoId", repoId);
  //   const handle = repo.find<{ name: string }>(repoId);

  //   handle.on("change", (payload) => {
  //     console.log("change", payload);
  //   });
  //   console.log(handle);
  // }, [repoId]);

  return (
    <Center mt="20px" mb="80px">
      <Button onClick={() => createCr()}>Create CR</Button>
      <Flex flexDirection="column" w="484px" p="16px">
        <styled.h4>Connexion à Compte-rendu VIF</styled.h4>
        <LoginForm />
      </Flex>
    </Center>
  );
};

export const Route = createLazyFileRoute("/login")({
  component: () => <LoginPage />,
});
