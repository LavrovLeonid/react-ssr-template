export {}

declare global {
  // eslint-disable-next-line no-unused-vars -- Override
  interface Window {
    assets: string[]
  }

  // eslint-disable-next-line no-unused-vars -- Override
  namespace NodeJS {
    // eslint-disable-next-line no-unused-vars -- Override
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production'
      API_URL: string
      SSR?: 'true' | 'false'
    }
  }
}
