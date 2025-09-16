import { UseMutationResult } from "@tanstack/react-query";
import { getErrorMessage } from "../api";
import { Alert } from "./MUIDsfr";
import { Typography } from "@mui/material";

export const MutationAlert = ({
  mutation,
  className,
}: {
  mutation: Pick<UseMutationResult<{ message: string }>, "error" | "isSuccess" | "data">;
  className?: string;
}) => {
  if (!mutation.error && !mutation.isSuccess) {
    return null;
  }

  return (
    <Alert
      className={className}
      sx={{
        my: "1.5rem",
      }}
      severity={mutation.error ? "error" : "success"}
      title={
        <Typography fontWeight="regular">
          {mutation.error
            ? getErrorMessage(mutation.error)
            : (mutation.data!.message ?? "Votre demande a été transmise.")}
        </Typography>
      }
    />
  );
};
