import { NODE_ENV, SSR, API_URL } from '@shared/constants'

export const getEnvVariables = (): string =>
  `process=${JSON.stringify({
    env: {
      NODE_ENV,
      SSR,
      API_URL,
    },
  })}`
