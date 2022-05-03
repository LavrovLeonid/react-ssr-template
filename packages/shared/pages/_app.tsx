import { FC, Suspense } from 'react'
import { useRoutes } from 'react-router-dom'
import { routes } from './routes'
import GlobalStyles from '../ui/global-styles'
import { ThemeProvider } from '@emotion/react'
import { theme } from '@shared/ui/theme'

const Aoo: FC = () => (
  <ThemeProvider theme={theme}>
    <GlobalStyles />
    <Suspense>{useRoutes(routes)}</Suspense>
  </ThemeProvider>
)

export default Aoo
