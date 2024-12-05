import { useUser } from "../../contexts/AuthContext";

import { groupBy } from "pastable";
import { db, useDbQuery } from "../../db/db";

export const useChipOptions = (key?: string) => {
  const user = useUser()!;

  // const decisionsChipsQuery = useDbQuery(
  //   // db.
  // )

  console.log("key", key);

  const chipsQuery = useDbQuery(
    db
      .selectFrom("clause_v2")
      .where((eb) => eb.or([eb("udap_id", "=", "ALL"), eb("udap_id", "=", user.udap_id)]))
      .where("key", "=", key!)
      .selectAll(),
  );

  console.log(chipsQuery);

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
