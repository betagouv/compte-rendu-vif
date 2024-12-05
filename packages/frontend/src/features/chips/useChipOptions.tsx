import { useUser } from "../../contexts/AuthContext";

import { groupBy } from "pastable";
import { db, useDbQuery } from "../../db/db";
import { Clause_v2 } from "../../db/AppSchema";

export const useChipOptions = (key?: string) => {
  const user = useUser()!;

  let query = db
    .selectFrom("clause_v2")
    .where((eb) => eb.or([eb("udap_id", "=", "ALL"), eb("udap_id", "=", user.udap_id)]));

  if (key) query = query.where("key", "=", key);

  const chipsQuery = useDbQuery(query.selectAll());

  const grouped = groupBy(chipsQuery.data ?? [], (item) => `${item.key}-${item.value}`);

  const chips = Object.values(grouped).map((value) => {
    if (value.length > 1) return value.find((chip) => chip.udap_id !== "ALL") ?? value[0];
    return value[0];
  });

  return chips.map(transformChip);
};

const transformChip = (chip: Clause_v2) => {
  return {
    ...chip,
    text: chip?.text?.replaceAll("\\n", "<br />").replace(/\n/g, "<br />"),
  };
};
