import { Autocomplete, Box } from "@mui/material";
import { db, useDbQuery } from "../db/db";
import { useState } from "react";
import { useStyles } from "tss-react";

export const ImmeubleAutocomplete = () => {
  // const value = useWatch({ control: form.control, name: "serviceInstructeur" });
  const [value, setValue] = useState<string | null>(null);

  const immeublesQuery = useDbQuery(db.selectFrom("pop_immeubles").selectAll());
  const { cx } = useStyles();

  const rawItems = immeublesQuery.data ?? [];
  console.log(rawItems);
  return (
    <Autocomplete
      disablePortal
      options={rawItems}
      getOptionLabel={(item) => item.titre_editorial_de_la_notice || ""}
      value={value ? rawItems.find((item) => item.id == value) : null}
      onChange={(_e, item) => {
        setValue(item ? item.id : null);
      }}
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
