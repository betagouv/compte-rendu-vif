import { db } from "./db/db";
import { v4 } from "uuid";
import { groupBy } from "pastable";

export const initClauseV2 = async () => {
  const nbClausesV2 = await db.clause_v2.count();
  if (nbClausesV2 > 0) return;

  const clauses = await db.clause.findMany();

  const grouped = groupBy(clauses, (clause) => `${clause.udap_id}-${clause.key}`);

  for (const clausesToAdd of Object.values(grouped)) {
    for (let i = 0; i < clausesToAdd.length; i++) {
      const clause = clausesToAdd[i]!;
      await db.clause_v2.create({
        data: {
          id: v4(),
          key: clause.key,
          text: clause.text,
          value: clause.value,
          position: i,
          udap_id: clause.udap_id,
        },
      });
    }
  }

  return "done";
};
