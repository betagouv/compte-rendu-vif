import { useUser } from "../../contexts/AuthContext";

import { useLiveQuery } from "electric-sql/react";
import { db } from "../../db";
import { groupBy } from "pastable";

export const useChipOptions = (key?: string) => {
  const user = useUser()!;

  // retrieve all chips with the given key
  const decisionsChipsQuery = useLiveQuery(
    db.chip.liveMany({
      where: {
        ...(key ? { key } : {}),
        udap_id: { in: ["ALL", user.udap.id] },
      },
    }),
  );

  const grouped = groupBy(decisionsChipsQuery.results ?? [], (item) => `${item.key}-${item.value}`);

  // keep only the most specific chip for each value
  return Object.values(grouped).map((value) => {
    if (value.length > 1) return value.find((chip) => chip.udap_id !== "ALL")!;
    return value[0];
  });
};
