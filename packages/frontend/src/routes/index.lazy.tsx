import { Flex } from "#styled-system/jsx";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useQuery } from "@triplit/react";
import { db } from "../db";
import { LoginForm } from "../components/LoginForm";
import { SignupForm } from "../components/SignupForm";

const query = db.query("delegations");

const Index = () => {
  const { results, fetching, error } = useQuery(db, query);

  console.log(results, fetching, error);

  const onClick = async () => {
    await db.insert("delegations", {
      createdBy: "d79a5b57-0f51-48d5-b0ff-94bdb8e459d4",
      delegatedTo: "random2",
    });
  };

  return (
    <Flex direction="column">
      <LoginForm />
      <SignupForm />
    </Flex>
  );
};

export const Route = createLazyFileRoute("/")({
  component: Index,
});
