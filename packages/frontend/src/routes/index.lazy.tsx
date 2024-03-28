import { Flex } from "#styled-system/jsx";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useQuery } from "@triplit/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { RouterInputs, trpc } from "../api";
import { db } from "../db";

const query = db.query("delegations");

const Index = () => {
  const { results, fetching, error } = useQuery(db, query);

  console.log(results, fetching, error);

  const onClick = async () => {
    await db.insert("delegations", {
      createdBy: "d79a5b57-0f51-48d5-b0ff-94bdb8e459d4aaaa",
      delegatedTo: "random2",
    });
    // await db.insert("reports", {
    //   applicantName: "test",
    //   applicantType: "test",
    //   createdBy: "ledouxsssm",
    //   decision: "ok",
    //   meetDate: new Date(),
    //   projectCadastralRef: "ok",
    //   projectDescription: "opk",
    //   projectLandContact: "ok",
    //   projectNature: "ok",
    //   projectSpaceType: "ok",
    //   projectStatus: "ok",
    //   title: "ok",
    // });
  };

  return (
    <Flex direction="column">
      <h1>Index</h1>
      <button onClick={onClick}>AAAAAAAAAAAA</button>
      <LoginForm />
      <SignupForm />
    </Flex>
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
