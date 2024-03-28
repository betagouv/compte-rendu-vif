import { createLazyFileRoute } from "@tanstack/react-router";
import { v4 } from "uuid";
import { useLiveQuery } from "electric-sql/react";
import { useElectric } from "../ElectricWrapper";
import { css } from "#styled-system/css";
import { Clause } from "../generated/client";
import { Flex } from "#styled-system/jsx";
import { useForm } from "react-hook-form";
import { RouterInputs, trpc } from "../api";
import { useState } from "react";

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

const LoginForm = () => {
  const [token, setToken] = useState("");
  const form = useForm<RouterInputs["login"]>();

  const mutation = trpc.login.useMutation();

  const login = async (values: RouterInputs["login"]) => {
    const response = await mutation.mutateAsync(values);
    console.log(response.token);
    setToken(response.token);
  };

  const query = trpc.verifyToken.useQuery({ token }, { enabled: !!token });
  console.log(query.data);

  return (
    <Flex direction="column">
      <div>
        <label htmlFor="email">email</label>
        <input {...form.register("email")} />
      </div>
      <div>
        <label htmlFor="password">password</label>
        <input {...form.register("password")} />
      </div>
      <button onClick={form.handleSubmit(login)}>Login</button>
    </Flex>
  );
};

const SignupForm = () => {
  const form = useForm<RouterInputs["createUser"]>();

  const mutation = trpc.createUser.useMutation();

  const signup = async (values: RouterInputs["createUser"]) => {
    const response = await mutation.mutateAsync(values);
    console.log(response);
  };

  return (
    <Flex direction="column">
      <div>
        <label htmlFor="name">name</label>
        <input {...form.register("name")} />
      </div>
      <div>
        <label htmlFor="email">email</label>
        <input {...form.register("email")} />
      </div>
      <div>
        <label htmlFor="password">password</label>
        <input {...form.register("password")} />
      </div>
      <button onClick={form.handleSubmit(signup)}>Signup</button>
    </Flex>
  );
};

export const Route = createLazyFileRoute("/")({
  component: Index,
});
