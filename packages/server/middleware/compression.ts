import { Express } from 'express'
import compression from 'compression'

export const compressionMiddleware = (app: Express) => {
  app.use(compression())
}
