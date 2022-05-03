import webpack from 'webpack'
import { Express } from 'express'
import devMiddleware from 'webpack-dev-middleware'
import hotMiddleware from 'webpack-hot-middleware'
import webpackDevelopmentConfiguration from '@webpack/webpack.development'

export const developmentMiddleware = (app: Express) => {
  const compiler = webpack(webpackDevelopmentConfiguration)

  app.use(
    devMiddleware(compiler, {
      stats: 'errors-warnings',
      writeToDisk: true,
    })
  )
  app.use(
    hotMiddleware(compiler, {
      path: '/__hmr',
      heartbeat: 10 * 1000,
    })
  )
}
