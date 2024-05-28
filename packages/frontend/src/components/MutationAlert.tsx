import Alert from "@codegouvfr/react-dsfr/Alert";
import { UseMutationResult } from "@tanstack/react-query";
import { css, cx } from "#styled-system/css";
import { styled } from "#styled-system/jsx";
import { getErrorMessage } from "../api";

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
      className={cx(css({ my: "1.5rem" }), className)}
      severity={mutation.error ? "error" : "success"}
      title={
        <styled.span fontWeight="regular">
          {mutation.error
            ? getErrorMessage(mutation.error)
            : mutation.data!.message ?? "Votre demande a été transmise."}
        </styled.span>
      }
    />
  );
};
