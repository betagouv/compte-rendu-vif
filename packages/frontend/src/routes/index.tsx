import { Center, CenterProps, Flex, styled } from "#styled-system/jsx";
import { createFileRoute, createLazyFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@triplit/react";
import { db } from "../db";
import Button from "@codegouvfr/react-dsfr/Button";
import { css } from "#styled-system/css";
import { Tabs } from "../components/Tabs";
import { useAuthContext, useIsLoggedIn, useUser } from "../contexts/AuthContext";
import { useLayoutEffect } from "react";

const query = db.query("delegations");

const Index = () => {
  const user = useUser()!;
  const onClick = async () => {
    await db.insert("delegations", {
      createdBy: "d79a5b57-0f51-48d5-b0ff-94bdb8e459d4",
      delegatedTo: "random2",
    });
  };

  const options = [
    { id: "my", label: user.name },
    { id: "udap", label: "UDAP" },
  ];

  return (
    <Flex direction="column">
      <Banner pt="30px" pb="40px">
        <styled.div color="text.title.blueFrance" fontSize="18px" fontWeight="bold">
          Compte-rendu VIF
        </styled.div>
        <Button className={css({ mt: "15px" })} iconId="ri-add-line">
          Créer un compte-rendu
        </Button>
      </Banner>

      <Tabs.Root defaultValue="my">
        <Tabs.List>
          {options.map((option) => (
            <Tabs.Trigger key={option.id} value={option.id}>
              {option.label}
            </Tabs.Trigger>
          ))}
          <Tabs.Indicator />
        </Tabs.List>
        <Tabs.Content value="my">Know React? Check out Solid!</Tabs.Content>
        <Tabs.Content value="udap">Know Solid? Check out Svelte!</Tabs.Content>
      </Tabs.Root>
    </Flex>
  );
};

export const Route = createFileRoute("/")({
  component: Index,
  beforeLoad: ({ context, location }) => {
    if (!context.token || !context.user) {
      throw redirect({ to: "/login", search: { redirect: location.href } });
    }
  },
});

const Banner = (props: CenterProps) => {
  return <Center flexDir="column" bgColor="background.open.blueFrance" {...props} />;
};
