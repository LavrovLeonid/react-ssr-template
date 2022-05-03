import { RequestHandler } from 'express'
import { renderToPipeableStream } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import { isSsr } from '@shared/constants'
import { getEntryPoints } from './utils/get-entry-points'
import { getHtmlMarkup } from './utils/get-html-markup'
import { getEnvVariables } from '../shared/utils/get-env-variables'
import Html from '@shared/pages/_document'
import Aoo from '@shared/pages/_app'

export const renderHandler: RequestHandler = (request, response) => {
  const url = request.url

  console.time(`Render ${url}`)

  if (isSsr) {
    const stream = renderToPipeableStream(
      <StaticRouter location={request.url}>
        <Html
          env={getEnvVariables()}
          title="Ssr app"
          description="Ssr react application"
        >
          <Aoo />
        </Html>
      </StaticRouter>,
      {
        bootstrapScripts: getEntryPoints(),
        onShellReady() {
          response.statusCode = 200
          response.setHeader('Content-type', 'text/html')
          stream.pipe(response)
        },
      }
    )
  } else {
    const htmlMarkup = getHtmlMarkup({
      title: 'App',
      description: 'React application',
      assets: getEntryPoints(),
      env: getEnvVariables(),
    })

    response.end(htmlMarkup)
  }

  console.timeEnd(`Render ${url}`)
}
