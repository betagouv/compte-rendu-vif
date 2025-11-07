import { Box, Typography } from "@mui/material";
import { createFileRoute } from "@tanstack/react-router";
import { SignupForm } from "../features/auth/SignupForm";
import { Center } from "#components/MUIDsfr.tsx";

export const Route = createFileRoute("/inscription")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Center mt="32px" flexDirection="column" textAlign="left">
      <SignupForm />
    </Center>
  );
}
