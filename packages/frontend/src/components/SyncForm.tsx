import { useMutation } from "@tanstack/react-query";
import { db } from "../db";
import { type FieldValues, type UseFormReturn, useWatch } from "react-hook-form";
import useDebounce from "react-use/lib/useDebounce";
import { Banner } from "./Banner";
import { useRouter } from "@tanstack/react-router";
import Button from "@codegouvfr/react-dsfr/Button";
import { styled } from "#styled-system/jsx";
import { fr } from "@codegouvfr/react-dsfr";
import { css } from "#styled-system/css";
import { useNetworkState } from "react-use";
export function SyncFormBanner<TFieldValues extends FieldValues>({
  form,
  baseObject,
}: {
  form: UseFormReturn<TFieldValues>;
  baseObject: Record<string, any>;
}) {
  const newObject = useWatch({ control: form.control });

  const diff = getDiff(newObject, baseObject);
  const syncMutation = useMutation(() => syncObject(baseObject.id, diff));

  useDebounce(() => syncMutation.mutate(), 500, [diff]);

  const router = useRouter();
  const goBack = () => router.history.back();
  const { online } = useNetworkState();

  const status = !online ? "offline" : Object.keys(diff).length ? "pending" : "saved";

  return (
    <Banner status={status} display="flex" flexDirection="row" justifyContent="space-between" w="100%" h="70px">
      {/* @ts-ignore dsfr buttons props must have children */}
      <Button
        className={css({ color: "black", _hover: { bgColor: "transparent" } })}
        priority="tertiary"
        iconId="ri-arrow-left-line"
        onClick={() => goBack()}
        size="large"
      />
      <styled.div mr="10px" color="black" textTransform="uppercase" fontSize="sm" fontWeight="500">
        <styled.span
          className={fr.cx("fr-icon-wifi-line")}
          aria-hidden={true}
          mr="6px"
          _before={{
            animation: syncMutation.isLoading ? "spin 1s linear infinite" : undefined,
          }}
        />
        {messages[status]}
      </styled.div>
    </Banner>
  );
}

const messages: Record<SyncFormStatus, string> = {
  offline: "Hors ligne",
  pending: "En attente",
  saved: "Connecté(e)",
  saving: "Sauvegarde",
};

export type SyncFormStatus = "offline" | "pending" | "saved" | "saving";

async function syncObject(id: string, diff: Record<string, any>) {
  if (!Object.keys(diff).length) return;

  console.log("saving", diff);

  await db.report.update({
    where: { id },
    data: diff,
  });
}

function isPrimitive(value: any) {
  return value !== Object(value);
}

function getDiff(a: Record<string, any>, b: Record<string, any>) {
  const diff = Object.entries(a).reduce((acc, [key, value]) => {
    const oldValue = b[key];
    if (!isPrimitive(oldValue) || !isPrimitive(value)) return acc;

    if (oldValue !== value) {
      acc[key] = value;
    }

    return acc;
  }, {} as any);

  return diff;
}
