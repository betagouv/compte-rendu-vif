import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/constat/$constatId/pdf')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/constat/$constatId/pdf"!</div>
}
