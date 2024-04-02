import { Center, Flex, styled } from "#styled-system/jsx";
import { createLazyFileRoute } from "@tanstack/react-router";
import { LoginForm } from "../components/LoginForm";
import { trpc } from "../api";
import { useEffect } from "react";
import { repo } from "../db";
import { AutomergeUrl } from "@automerge/automerge-repo";

const LoginPage = () => {
  const repoIdQuery = trpc.getOrCreateRepo.useQuery({ repoId: "test" });

  const repoId = repoIdQuery.data || (localStorage.getItem("repoId") as AutomergeUrl | undefined);
  console.log(repoIdQuery.data);

  useEffect(() => {
    if (!repoId) return;
    localStorage.setItem("repoId", repoId);
    const handle = repo.find<{ name: string }>(repoId);

    handle.on("change", (payload) => {
      console.log("change", payload);
    });
    console.log(handle);
  }, [repoId]);

  return (
    <Center mt="20px" mb="80px">
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
