import { createLazyFileRoute } from "@tanstack/react-router";
import { SignupForm } from "../components/SignupForm";
import { Center, Flex } from "#styled-system/jsx";
import { styled } from "#styled-system/jsx";
import { RedirectIfUser } from "../components/RedirectIfUser";

const SignupPage = () => {
  return (
    <Center mt="20px" mb="80px">
      <Flex flexDirection="column" w="484px" p="16px">
        <styled.h4>Inscription à Compte-rendu VIF</styled.h4>
        <SignupForm />
      </Flex>
    </Center>
  );
};

export const Route = createLazyFileRoute("/signup")({
  component: () => (
    <RedirectIfUser>
      <SignupPage />
    </RedirectIfUser>
  ),
});
