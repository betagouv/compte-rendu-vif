import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createRouter, RouterProvider } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'
import { startReactDsfr } from '@codegouvfr/react-dsfr/spa'
import '#styled-system/styles.css'

startReactDsfr({ defaultColorScheme: 'system' })

const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
