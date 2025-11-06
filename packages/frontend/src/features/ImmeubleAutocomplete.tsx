import { Autocomplete, Box } from "@mui/material";
import { db, useDbQuery } from "../db/db";
import { useState } from "react";
import { useStyles } from "tss-react";
import Fuse, { IFuseOptions } from "fuse.js";
import { PopImmeuble } from "../db/AppSchema";
import { useFormContext, useWatch } from "react-hook-form";
import { StateReportFormType, useStateReportFormContext } from "./state-report/utils";
import { Spinner } from "#components/Spinner.tsx";
import { fr } from "@codegouvfr/react-dsfr";
import Highlighter from "react-highlight-words";

type FilterablePopImmeubles = Pick<
  PopImmeuble,
  "reference" | "id" | "titre_editorial_de_la_notice" | "commune_forme_editoriale"
>;
const fuseOptions: IFuseOptions<FilterablePopImmeubles> = {
  keys: ["titre_editorial_de_la_notice", "commune_forme_editoriale", "id"],
  shouldSort: true,
};

const mapping: Partial<Record<keyof PopImmeuble, keyof StateReportFormType>> = {
  reference: "reference_pop",
  id: "id",
  denomination_de_l_edifice: "nature_edifice",
  adresse_forme_editoriale: "adresse",
  commune_forme_editoriale: "commune",
  commune_forme_index: "commune_historique",
  cadastre: "reference_cadastrale",
  siecle_de_la_campagne_principale_de_construction: "periode_construction",
  typologie_de_la_protection: "nature_protection",
  precision_de_la_protection: "parties_protegees",
  description_de_l_edifice: "description",
  titre_editorial_de_la_notice: "titre_edifice",
};

export const ImmeubleAutocomplete = () => {
  const form = useStateReportFormContext();
  const [value] = useWatch({ control: form.control, name: ["reference_pop"] });
  const { cx } = useStyles();

  const immeubleQuery = useDbQuery(
    db
      .selectFrom("pop_immeubles")
      .select(["reference", "id", "titre_editorial_de_la_notice", "commune_forme_editoriale"]),
  );
  const rawItems = immeubleQuery.data ?? [null];
  const searchEngine = new Fuse(rawItems, fuseOptions);

  const setValue = async (item: FilterablePopImmeubles | null) => {
    form.setValue("reference_pop", item ? item.id : null);

    if (!item) return;
    const immeubleDetails = await db
      .selectFrom("pop_immeubles")
      .selectAll()
      .where("id", "=", item ? item.id : "")
      .executeTakeFirst();
    if (!immeubleDetails) return;

    for (const [key, formField] of Object.entries(mapping)) {
      const value = immeubleDetails[key as keyof PopImmeuble] || null;
      form.setValue(formField as keyof StateReportFormType, value);
    }
  };
  if (value) return <div>{form.watch("titre_edifice")}</div>;

  return (
    <Autocomplete
      disablePortal
      clearOnBlur={false}
      options={rawItems}
      getOptionLabel={(item) => item.titre_editorial_de_la_notice || ""}
      getOptionKey={(item) => item.reference!}
      value={value ? rawItems.find((item) => item.id == value) : null}
      // TODO: use coordinates to sort results
      filterOptions={(x, state) =>
        state.inputValue ? searchEngine.search(state.inputValue).map((result) => result.item) : [...x.slice(0, 50)]
      }
      onChange={(_e, item) => {
        setValue(item);
      }}
      renderOption={({ key, ...props }, option, state, _ownerState) =>
        option === null ? (
          <Box>Aucun résultat !</Box>
        ) : (
          <Box
            component="li"
            {...props}
            key={key}
            display="flex"
            justifyContent="flex-start"
            alignItems="flex-start !important"
            flexDirection="column"
            textAlign="left"
            color={fr.colors.decisions.text.actionHigh.blueFrance.default}
          >
            <Box component="span" fontSize="16px">
              <Highlighter
                searchWords={state.inputValue.split(" ")}
                autoEscape
                textToHighlight={option.titre_editorial_de_la_notice ?? ""}
                activeStyle={{}}
                unhighlightStyle={{}}
                highlightStyle={{
                  fontWeight: "bold",
                  backgroundColor: "transparent",
                  color: fr.colors.decisions.text.actionHigh.blueFrance.default,
                }}
              />
            </Box>
            <Box component="span" fontSize="12px">
              <Highlighter
                searchWords={state.inputValue.split(" ")}
                autoEscape
                textToHighlight={option.commune_forme_editoriale ?? ""}
                activeStyle={{}}
                unhighlightStyle={{}}
                highlightStyle={{
                  fontWeight: "bold",
                  backgroundColor: "transparent",
                  color: fr.colors.decisions.text.actionHigh.blueFrance.default,
                }}
              />
            </Box>
          </Box>
        )
      }
      renderInput={(params) => (
        <div className="fr-input-group">
          <label className="fr-label" htmlFor={params.id}>
            Nom ou référence du monument
          </label>
          <Box ref={params.InputProps.ref} mt="8px">
            <input {...params.inputProps} className={cx(params.inputProps.className, "fr-input")} type={"text"} />
          </Box>
        </div>
      )}
      noOptionsText={<Box>{immeubleQuery.isLoading ? <Spinner size={20} /> : "Aucun résultat"}</Box>}
    />
  );
};
