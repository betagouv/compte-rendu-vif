import { useLiveQuery } from "electric-sql/react";
import { db } from "../../db";
import { Spinner } from "#components/Spinner";
import { groupBy } from "pastable";
import { useUser } from "../../contexts/AuthContext";
import { Divider, Flex, Stack, styled } from "#styled-system/jsx";
import { Fragment } from "react/jsx-runtime";
import { MenuTitle } from "./MenuTitle";
import type { ModalContentProps } from "./MenuButton";
import { ReactNode, useEffect, useState } from "react";
import Button from "@codegouvfr/react-dsfr/Button";
import { css } from "#styled-system/css";
import { Clause_v2 } from "@cr-vif/electric-client/frontend";
import Input from "@codegouvfr/react-dsfr/Input";
import { FormProvider, useFieldArray, useForm, useFormContext } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import Select from "@codegouvfr/react-dsfr/Select";
import { v4 } from "uuid";

export const ClauseMenu = ({ isNational, ...props }: { isNational: boolean } & ModalContentProps) => {
  const user = useUser()!;

  const clausesQuery = useLiveQuery(
    db.clause_v2.liveMany({
      where: {
        key: {
          in: isNational ? ["type-espace", "decision"] : ["contacts-utiles", "bonnes-pratiques"],
        },
        OR: [{ udap_id: "ALL" }, { udap_id: user.udap_id! }],
      },
    }),
  );

  if (!clausesQuery.updatedAt) return <Spinner />;

  if (isNational)
    return (
      <>
        <ClauseTitle isNational={isNational} buttons={null} {...props} />
        <ClauseList clauses={(clausesQuery.results as any) ?? []} isEditing={false} />
      </>
    );

  return (
    <ClauseForm
      clauses={clausesQuery.results?.map((c) => ({ ...c, text: c.text?.replaceAll("\\n", "\n") ?? "" })) ?? []}
      {...props}
      isNational={isNational}
    />
  );
};

type Form = {
  clauses: Clause_v2[];
};

const getDiff = (baseClauses: Clause_v2[], modifiedClauses: Clause_v2[]) => {
  const newClauses = modifiedClauses.filter((c) => !baseClauses.find((bc) => bc.id === c.id));
  const updatedClauses = modifiedClauses.filter((c) => {
    const baseClause = baseClauses.find((bc) => bc.id === c.id);
    return baseClause && baseClause.text !== c.text;
  });
  const deletedClauses = baseClauses.filter((bc) => !modifiedClauses.find((c) => bc.id === c.id));

  return { newClauses: newClauses, updatedClauses: updatedClauses, deletedClauses };
};
type Mode = "view" | "add" | "edit";

const ClauseForm = ({
  clauses,
  isNational,
  ...props
}: { clauses: Clause_v2[]; isNational: boolean } & ModalContentProps) => {
  const [mode, setMode] = useState<Mode>("view");

  const isEditing = mode === "edit";
  const isAdding = mode === "add";

  const form = useForm<Form>({
    defaultValues: {
      clauses: clauses,
    },
  });

  useEffect(() => {
    form.setValue("clauses", clauses);
  }, [clauses]);

  const { fields } = useFieldArray({
    name: "clauses",
    control: form.control,
    keyName: "_id",
  });

  const applyDiffMutation = useMutation(
    async (diff: { updatedClauses: Clause_v2[]; newClauses: Clause_v2[]; deletedClauses: Clause_v2[] }) => {
      for (const clause of diff.updatedClauses) {
        await db.clause_v2.update({
          where: { id: clause.id },
          data: { text: clause.text },
        });
      }
    },
    {
      onSuccess: () => setMode("view"),
    },
  );

  const onSubmit = (data: Form) => {
    const diff = getDiff(clauses, data.clauses);
    applyDiffMutation.mutate(diff);
  };

  const fieldsWithIndex = fields.map((field, index) => ({ ...field, _index: index }));

  const buttons =
    isEditing || isAdding ? (
      <>
        <Button
          className={css({
            "&::before": {
              ml: "0 !important",
              mr: { base: "0 !important", lg: "8px !important" },
            },
          })}
          disabled={applyDiffMutation.isLoading}
          iconId="ri-save-fill"
          priority="primary"
          type="submit"
          nativeButtonProps={{
            form: isEditing ? "edit-form" : "add-form",
          }}
        >
          <styled.span hideBelow="lg">Enregistrer</styled.span>
        </Button>
      </>
    ) : (
      <>
        <Button
          className={css({
            "&::before": {
              ml: "0 !important",
              mr: { base: "0 !important", lg: "8px !important" },
            },
          })}
          nativeButtonProps={{ type: "button" }}
          iconId="ri-pencil-fill"
          priority="secondary"
          onClick={(e) => {
            e.preventDefault();
            setMode("edit");
          }}
        >
          <styled.span hideBelow="lg">Modifier</styled.span>
        </Button>
        <Button
          className={css({
            "&::before": {
              ml: "0 !important",
              mr: { base: "0 !important", lg: "8px !important" },
            },
          })}
          nativeButtonProps={{ type: "button" }}
          iconId="ri-add-fill"
          priority="secondary"
          onClick={(e) => {
            e.preventDefault();
            setMode("add");
          }}
        >
          <styled.span hideBelow="lg">Ajouter</styled.span>
        </Button>
      </>
    );

  return (
    <>
      <ClauseTitle isNational={isNational} buttons={buttons} {...props} />
      {isAdding ? <ClauseAdd onSuccess={() => setMode("view")} isNational={isNational} /> : null}
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} id="edit-form">
          <ClauseList clauses={fieldsWithIndex} isEditing={isEditing} />
        </form>
      </FormProvider>
    </>
  );
};

const ClauseTitle = ({
  isNational,
  buttons,
  ...props
}: { isNational: boolean; buttons?: ReactNode; isEditing?: boolean } & ModalContentProps) => (
  <MenuTitle {...props} buttons={buttons}>
    Clauses {isNational ? "nationales" : "départementales"}
  </MenuTitle>
);

const ClauseList = ({ clauses, isEditing }: { clauses: ClauseWithIndex[]; isEditing: boolean }) => {
  const groupedByKey = groupBy(clauses, "key");

  return (
    <Stack>
      {Object.entries(groupedByKey).map(([key, clauses], index) => (
        <Fragment key={key}>
          <Stack gap="24px">
            <styled.h2 fontSize="20px">{(clauseNameMap as any)[key] ?? key}</styled.h2>
            {clauses.map((clause) => (
              <DivOrTextarea key={clause.id} clause={clause} isEditing={isEditing ?? false} />
            ))}
          </Stack>
          {index < Object.keys(groupedByKey).length - 1 && <Divider height="1px" my="16px" color="#C1C1FB" />}
        </Fragment>
      ))}
    </Stack>
  );
};

type ClauseWithIndex = Clause_v2 & { _index: number };

const DivOrTextarea = ({ clause, isEditing }: { clause: ClauseWithIndex; isEditing: boolean }) => {
  if (!isEditing) return <ClauseView clause={clause} />;
  return <ClauseEdit clause={clause} />;
};

const ClauseView = ({ clause }: { clause: ClauseWithIndex }) => {
  return (
    <Flex flexDir="column">
      <styled.div color="text-action-high-blue-france" fontWeight="bold">
        {clause.value}
      </styled.div>
      {clause.text.split("\\n").map((text, i) => {
        return (
          <styled.div key={i} whiteSpace="pre-wrap">
            {text}
          </styled.div>
        );
      })}
    </Flex>
  );
};

const ClauseEdit = ({ clause }: { clause: ClauseWithIndex }) => {
  const form = useFormContext<Form>();

  const deleteClauseMutation = useMutation(
    async () => {
      await db.clause_v2.delete({ where: { id: clause.id } });
    },
    {
      onSuccess: () => {},
    },
  );

  return (
    <Flex flexDir="column">
      <Flex justifyContent="space-between" alignItems="center" w="100%">
        <styled.div color="text-action-high-blue-france" fontWeight="bold">
          {clause.value}
        </styled.div>
        <Button
          iconId="ri-delete-bin-fill"
          disabled={deleteClauseMutation.isLoading}
          onClick={() => deleteClauseMutation.mutate()}
          priority="secondary"
          type="button"
          size="small"
        >
          <styled.span hideBelow="lg">Supprimer</styled.span>
        </Button>
      </Flex>

      <Input
        label=""
        textArea
        nativeTextAreaProps={{
          rows: 6,
          ...form.register(`clauses.${clause._index}.text` as const),
        }}
      />
    </Flex>
  );
};

const ClauseAdd = ({ onSuccess, isNational }: { onSuccess: () => void; isNational: boolean }) => {
  const user = useUser()!;
  const form = useForm<Clause_v2>({
    defaultValues: { key: "", value: "", text: "", id: v4(), udap_id: isNational ? "ALL" : user.udap_id },
  });
  const keyOptions = Object.entries(clauseNameMap)
    .map(([key, label]) => ({ value: key, label }))
    .filter(({ value }) => {
      const isNationalClause = nationalClauses.includes(value);
      return isNational ? isNationalClause : !isNationalClause;
    });

  const addClauseMutation = useMutation(
    async (clause: Clause_v2) => {
      await db.clause_v2.create({ data: clause });
    },
    {
      onSuccess,
    },
  );

  return (
    <form onSubmit={form.handleSubmit((data) => addClauseMutation.mutate(data))} id="add-form">
      <Stack mb="48px">
        <Select label="Catégorie" nativeSelectProps={form.register("key")}>
          {keyOptions.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </Select>

        <Input label="Intitulé" nativeInputProps={form.register("value")} />

        <Input label="Texte" textArea nativeTextAreaProps={{ rows: 6, ...form.register("text") }} />
      </Stack>
    </form>
  );
};

const nationalClauses = ["type-espace", "decision"];

const clauseNameMap = {
  "type-espace": "Type d'espace",
  decision: "Décision",
  "contacts-utiles": "Contacts utiles",
  "bonnes-pratiques": "Bonnes pratiques",
};
