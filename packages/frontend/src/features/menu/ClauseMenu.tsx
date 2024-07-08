import { useLiveQuery } from "electric-sql/react";
import { db } from "../../db";
import { Spinner } from "#components/Spinner";
import { groupBy } from "pastable";
import { useUser } from "../../contexts/AuthContext";
import { Divider, Flex, Stack, styled } from "#styled-system/jsx";
import { Fragment } from "react/jsx-runtime";
import { MenuTitle } from "./MenuTitle";
import type { ModalContentProps } from "./MenuButton";
import { useEffect, useState } from "react";
import Button from "@codegouvfr/react-dsfr/Button";
import { css } from "#styled-system/css";
import { Clause_v2 } from "@cr-vif/electric-client/frontend";
import Input from "@codegouvfr/react-dsfr/Input";
import { FormProvider, useFieldArray, useForm, useFormContext } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";

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

const ClauseForm = ({
  clauses,
  isNational,
  ...props
}: { clauses: Clause_v2[]; isNational: boolean } & ModalContentProps) => {
  const [isEditing, setIsEditing] = useState(false);

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
      onSuccess: () => setIsEditing(false),
    },
  );

  const onSubmit = (data: Form) => {
    const diff = getDiff(clauses, data.clauses);
    applyDiffMutation.mutate(diff);
  };

  const fieldsWithIndex = fields.map((field, index) => ({ ...field, _index: index }));
  const groupedByKey = groupBy(fieldsWithIndex, "key");

  const buttons = isEditing ? (
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
          setIsEditing((isEditing) => !isEditing);
        }}
      >
        <styled.span hideBelow="lg">Modifier</styled.span>
      </Button>
    </>
  );

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <MenuTitle {...props} buttons={<Flex>{buttons}</Flex>}>
          Clauses {isNational ? "nationales" : "départementales"}
        </MenuTitle>
        <Stack>
          {Object.entries(groupedByKey).map(([key, clauses], index) => (
            <Fragment key={key}>
              <Stack gap="16px">
                <styled.h2 fontSize="24px" fontWeight="bold">
                  {(clauseNameMap as any)[key] ?? key}
                </styled.h2>
                {clauses.map((clause) => (
                  <DivOrTextarea key={clause.id} clause={clause} isEditing={isEditing} />
                ))}
              </Stack>
              {index < Object.keys(groupedByKey).length - 1 && <Divider height="1px" my="16px" color="#C1C1FB" />}
            </Fragment>
          ))}
        </Stack>
      </form>
    </FormProvider>
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

  return (
    <Flex flexDir="column">
      <styled.div color="text-action-high-blue-france" fontWeight="bold">
        {clause.value}
      </styled.div>

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

const clauseNameMap = {
  "type-espace": "Type d'espace",
  decision: "Décision",
  "contacts-utiles": "Contacts utiles",
  "bonnes-pratiques": "Bonnes pratiques",
};
