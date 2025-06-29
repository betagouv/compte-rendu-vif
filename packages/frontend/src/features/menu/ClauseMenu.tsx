import { Spinner } from "#components/Spinner";
import { groupBy } from "pastable";
import { useUser } from "../../contexts/AuthContext";
import { Divider, Flex, Stack, styled } from "#styled-system/jsx";
import { Fragment } from "react/jsx-runtime";
import { MenuTitle } from "./MenuTitle";
import type { ModalContentProps } from "./MenuButton";
import { ReactNode, useEffect, useState } from "react";
import Button from "@codegouvfr/react-dsfr/Button";
import { css, cx } from "#styled-system/css";
import Input from "@codegouvfr/react-dsfr/Input";
import { FormProvider, useFieldArray, useForm, useFormContext } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import Select from "@codegouvfr/react-dsfr/Select";
import { v4 } from "uuid";
import { fr } from "@codegouvfr/react-dsfr";
import { db, useDbQuery } from "../../db/db";
import { Clause_v2 } from "../../db/AppSchema";
import { useSelector } from "@xstate/react";
import { menuActor } from "./menuMachine";

export const ClauseMenu = () => {
  const user = useUser()!;

  const clauseData = useSelector(menuActor, (state) => state.context.clause)!;

  const clausesQuery = useDbQuery(
    db
      .selectFrom("clause_v2")
      .where("key", "=", clauseData.clauseId)
      .where("udap_id", "in", ["ALL", user.udap_id])
      .selectAll(),
  );

  if (clausesQuery.isLoading)
    return (
      <styled.div h="100%">
        <Spinner />
      </styled.div>
    );

  return (
    <>
      {/* <ClauseTitle
        isNational={isNational}
        buttons={null}
        alert={
          <ClauseFormBanner
            status="idle"
            icon={fr.cx("fr-icon-alert-fill")}
            text={`Ces clauses sont communes à toutes les UDAP et ne peuvent pas être modifiées.`}
          />
        }
        {...props}
      /> */}
      <MenuTitle>
        <styled.span fontSize="20px" fontWeight="normal">
          {clauseData.label}
        </styled.span>
      </MenuTitle>
      <styled.div px="20px" pb="20px">
        <ClauseList clauses={(clausesQuery.data as any) ?? []} isEditing={false} />
      </styled.div>
    </>
  );
};

type Form = {
  clauses: Clause_v2[];
};

const getDiff = (baseClauses: Clause_v2[], modifiedClauses: Clause_v2[]) => {
  const updatedClauses = modifiedClauses.filter((c) => {
    const baseClause = baseClauses.find((bc) => bc.id === c.id);
    return baseClause && (baseClause.text !== c.text || baseClause.value !== c.value);
  });

  return { updatedClauses };
};
type Mode = "view" | "add" | "edit";

const initialBannerProps = {
  status: "idle" as BannerStatus,
  icon: fr.cx("fr-icon-alert-fill"),
};

const ClauseForm = ({
  clauses,
  isNational,
  ...props
}: { clauses: Clause_v2[]; isNational: boolean } & ModalContentProps) => {
  const [mode, setMode] = useState<Mode>("view");
  const [bannerProps, setBannerProps] = useState<{ status: BannerStatus; text: string; icon: string } | null>({
    ...initialBannerProps,
    text: "Ces clauses sont spécifiques à votre UDAP et modifiables.",
  });

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
    async (diff: { updatedClauses: Clause_v2[] }) => {
      for (const clause of diff.updatedClauses) {
        await db
          .updateTable("clause_v2")
          .set({ text: clause.text, value: clause.value })
          .where("id", "=", clause.id)
          .execute();
      }
    },
    {
      onSuccess: () => {
        setBannerProps({
          status: "success",
          icon: fr.cx("ri-check-fill"),
          text: "Modifications enregistrées",
        });
        setMode("view");
      },
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
              mr: { base: "8px !important", lg: "8px !important" },
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
          Enregistrer
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
            setBannerProps({
              ...initialBannerProps,
              text: "**Vous modifiez les clauses pour toute l’UDAP.** Pensez à faire des contenus courts et explicites pour vos lecteurs.",
            });
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
            setBannerProps({
              ...initialBannerProps,
              text: "**Vous ajoutez une clause pour toute l’UDAP.** Pensez à faire des contenus courts et explicites pour vos lecteurs.",
            });
            setMode("add");
          }}
        >
          <styled.span hideBelow="lg">Ajouter</styled.span>
        </Button>
      </>
    );

  return (
    <>
      <ClauseTitle
        isNational={isNational}
        buttons={buttons}
        {...props}
        alert={bannerProps ? <ClauseFormBanner {...bannerProps} /> : null}
      />
      <styled.div px="20px">
        {isAdding ? (
          <ClauseAdd
            onSuccess={() => {
              setBannerProps({ status: "success", text: "Clause ajoutée", icon: "ri-check-fill" });
              setMode("view");
            }}
            isNational={isNational}
          />
        ) : null}
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} id="edit-form">
            <ClauseList clauses={fieldsWithIndex} isEditing={isEditing} />
          </form>
        </FormProvider>
      </styled.div>
    </>
  );
};

type BannerStatus = "idle" | "success";

export const ClauseFormBanner = ({ status, icon, text }: { text: string; icon: string; status: BannerStatus }) => {
  const bgColor = status === "idle" ? "#E8EDFF" : "#B8FEC9";
  const iconColor = status === "idle" ? "#0063CB" : "#18753C";

  return (
    <Flex mb="24px" py="16px" px="32px" bgColor={bgColor}>
      <i className={cx(icon, css({ color: iconColor }))} />
      <styled.div
        dangerouslySetInnerHTML={{ __html: transformBold(text) }}
        ml="16px"
        pr="24px"
        color={iconColor}
      ></styled.div>
    </Flex>
  );
};

export function transformBold(str: string) {
  return str.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");
}

const ClauseTitle = ({
  isNational,
  buttons,
  alert,
  ...props
}: { alert?: ReactNode; isNational: boolean; buttons?: ReactNode; isEditing?: boolean } & ModalContentProps) => (
  <MenuTitle {...props} buttons={buttons} alert={alert}>
    <styled.span className={css({ pl: "16px" })}>Clauses {isNational ? "nationales" : "départementales"}</styled.span>
  </MenuTitle>
);

const ClauseList = ({ clauses, isEditing }: { clauses: ClauseWithIndex[]; isEditing: boolean }) => {
  const groupedByKey = groupBy(clauses, "key");

  return (
    <Stack>
      {Object.entries(groupedByKey).map(([key, clauses], index) => (
        <Fragment key={key}>
          <Stack gap="20px">
            {clauses.map((clause) => (
              <DivOrTextarea key={clause.id} clause={clause} isEditing={isEditing ?? false} />
            ))}
          </Stack>
          {index < Object.keys(groupedByKey).length - 1 && (
            <Divider height="1px" my={{ base: "16px", lg: "30px" }} color="#C1C1FB" />
          )}
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
      {(clause.text || "").split("\\n").map((text, i) => {
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
      await db.deleteFrom("clause_v2").where("id", "=", clause.id).execute();
    },
    {
      onSuccess: () => {},
    },
  );

  return (
    <Flex flexDir="column">
      <Flex justifyContent="space-between" alignItems="center" w="100%">
        <Input
          label="Intitulé"
          nativeInputProps={form.register(`clauses.${clause._index}.value`, { required: true })}
        />
        <Button
          className={css({ hideBelow: "lg" })}
          iconId="ri-delete-bin-fill"
          disabled={deleteClauseMutation.isLoading}
          onClick={() => deleteClauseMutation.mutate()}
          priority="tertiary"
          type="button"
        >
          Supprimer
        </Button>
        <Button
          className={css({ hideFrom: "lg" })}
          iconId="ri-delete-bin-fill"
          disabled={deleteClauseMutation.isLoading}
          onClick={() => deleteClauseMutation.mutate()}
          priority="secondary"
          type="button"
          size="small"
        ></Button>
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
      await db.insertInto("clause_v2").values(clause).execute();
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
