export const { NODE_ENV, SSR, API_URL } = process.env

export const isDevelopment = NODE_ENV !== 'production'
export const isSsr = SSR === 'true'
