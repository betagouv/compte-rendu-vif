import { createLazyFileRoute } from "@tanstack/react-router";
import { Flex } from "#styled-system/jsx";

const Index = () => {
  return (
    <Flex flexDirection="column">
      <h1>Compte rendu vif</h1>
      <p>
        Le compte rendu vif est un outil de prise de note collaborative et en
        temps réel.
      </p>
      <p>
        Il permet de rédiger des notes, de les commenter et de les partager.
      </p>
    </Flex>
  );
};

export const Route = createLazyFileRoute("/")({
  component: Index,
});
