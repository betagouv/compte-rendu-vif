import { db } from "./db/db";
import { v4 } from "uuid";

export const initClauseV2 = async () => {
  const nbClausesV2 = await db.clause_v2.count();
  if (nbClausesV2 > 0) return;

  const clauses = await db.clause.findMany();

  for (const clause of clauses) {
    await db.clause_v2.create({
      data: {
        id: v4(),
        key: clause.key,
        text: clause.text,
        value: clause.value,
        udap_id: clause.udap_id,
      },
    });
  }

  return "done";
};
