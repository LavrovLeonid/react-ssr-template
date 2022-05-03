import { lazy } from 'react'
import { RouteObject } from 'react-router-dom'

const Index = lazy(
  () =>
    import(
      /* webpackChunkName: "index" */
      /* webpackPrefetch: true */
      '@shared/pages/index'
    )
)

const About = lazy(
  () =>
    import(
      /* webpackChunkName: "about" */
      '@shared/pages/about'
    )
)

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Index />,
  },
  {
    path: '/about',
    element: <About />,
  },
]
