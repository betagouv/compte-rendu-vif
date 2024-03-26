import { createLazyFileRoute } from '@tanstack/react-router'
import { Flex, styled } from '#styled-system/jsx'
import { css } from '#styled-system/css'
import { db } from '../db'
import { useEffect } from 'react'
import { useQuery } from '@triplit/react'
import { RouterInputs, trpc } from '../api'
import { useForm } from 'react-hook-form'

const query = db.query('clauses')

const Index = () => {
  const { results, fetching, error } = useQuery(db, query)

  console.log(results, fetching, error)

  return (
    <Flex direction="column">
      <h1>Index</h1>
      <LoginForm />
      <SignupForm />
    </Flex>
  )
}
const LoginForm = () => {
  const form = useForm<RouterInputs['login']>()

  const mutation = trpc.login.useMutation()

  const login = async (values: RouterInputs['login']) => {
    const response = await mutation.mutateAsync(values)
    console.log(response)
  }

  return (
    <Flex direction="column">
      <div>
        <label htmlFor="email">email</label>
        <input {...form.register('email')} />
      </div>
      <div>
        <label htmlFor="password">password</label>
        <input {...form.register('password')} />
      </div>
      <button onClick={form.handleSubmit(login)}>Login</button>
    </Flex>
  )
}

const SignupForm = () => {
  const form = useForm<RouterInputs['createUser']>()

  const mutation = trpc.createUser.useMutation()

  const signup = async (values: RouterInputs['createUser']) => {
    const response = await mutation.mutateAsync(values)
    console.log(response)
  }

  return (
    <Flex direction="column">
      <div>
        <label htmlFor="name">name</label>
        <input {...form.register('name')} />
      </div>
      <div>
        <label htmlFor="email">email</label>
        <input {...form.register('email')} />
      </div>
      <div>
        <label htmlFor="password">password</label>
        <input {...form.register('password')} />
      </div>
      <button onClick={form.handleSubmit(signup)}>Signup</button>
    </Flex>
  )
}

export const Route = createLazyFileRoute('/')({
  component: Index,
})
