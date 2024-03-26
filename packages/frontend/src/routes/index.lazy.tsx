import { createLazyFileRoute } from "@tanstack/react-router";
import { v4 } from "uuid";
import { useLiveQuery } from "electric-sql/react";
import { useElectric } from "../ElectricWrapper";
import { css } from "#styled-system/css";
import { Clause } from "../generated/client";
import { Flex } from "#styled-system/jsx";

const Index = () => {
  const { db } = useElectric()!;
  const { results } = useLiveQuery(db.Clause.liveMany({ include: { ReportToClause: true } }));

  console.log(results);

  const addClause = async () => {
    await db.Clause.create({
      data: {
        id: v4(),
        label: "Clause 1",
        value: "Clause 1",
      },
    });
  };

  const deleteClause = async (clause: Clause) => {
    await db.Clause.delete({
      where: {
        id: clause.id,
      },
    });
  };

  return (
    <Flex flexDirection="column">
      <button onClick={addClause}>add</button>
      <Flex flexDirection="column">
        {results?.map((clause, index) => <ClauseCard key={index} clause={clause} onDelete={deleteClause} />)}
      </Flex>
    </Flex>
  );
};

const ClauseCard = ({ clause, onDelete }: { clause: Clause; onDelete: (c: Clause) => void }) => {
  return (
    <div
      className={css({
        display: "flex",
        flexDirection: "column",
        border: "1px solid",
        borderColor: "artwork.decorative.blueFrance",
        borderRadius: "4px",
        margin: "8px",
        padding: "8px",
      })}
    >
      <div>{clause.label}</div>
      <button onClick={() => onDelete(clause)}>X</button>
    </div>
  );
};

export const Route = createLazyFileRoute("/")({
  component: Index,
});
