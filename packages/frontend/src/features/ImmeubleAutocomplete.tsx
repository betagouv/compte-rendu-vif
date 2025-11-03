import { Autocomplete, Box } from "@mui/material";
import { db, useDbQuery } from "../db/db";
import { useState } from "react";
import { useStyles } from "tss-react";
import Fuse, { FuseIndexOptions, FuseSearchOptions, IFuseOptions } from "fuse.js";
import { PopImmeuble } from "../db/AppSchema";

const fuseOptions: IFuseOptions<PopImmeuble> = {
  keys: ["titre_editorial_de_la_notice", "commune_forme_editoriale"],
  shouldSort: true,
};

export const ImmeubleAutocomplete = () => {
  // const value = useWatch({ control: form.control, name: "serviceInstructeur" });
  const [value, setValue] = useState<string | null>(null);
  const { cx } = useStyles();

  const immeubleQuery = useDbQuery(db.selectFrom("pop_immeubles").selectAll());
  const rawItems = immeubleQuery.data ?? [];
  const searchEngine = new Fuse(rawItems, fuseOptions);

  return (
    <Autocomplete
      disablePortal
      clearOnBlur={false}
      options={rawItems}
      getOptionLabel={(item) => item.titre_editorial_de_la_notice || ""}
      getOptionKey={(item) => item.reference!}
      value={value ? rawItems.find((item) => item.id == value) : null}
      filterOptions={(x, state) => searchEngine.search(state.inputValue).map((result) => result.item)}
      onChange={(_e, item) => {
        setValue(item ? item.id : null);
      }}
      renderOption={({ key, ...props }, option, state, ownerState) => (
        <Box
          component="li"
          {...props}
          key={key}
          display="flex"
          justifyContent="flex-start"
          alignItems="flex-start !important"
          flexDirection="column"
          textAlign="left"
        >
          <Box component="span" fontSize="16px">
            {option.titre_editorial_de_la_notice}
          </Box>
          <Box component="span" fontSize="12px">
            {option.commune_forme_editoriale}
          </Box>
        </Box>
      )}
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
      noOptionsText="Aucun résultat"
    />
  );
};
