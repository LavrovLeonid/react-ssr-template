import { createRoot, hydrateRoot } from 'react-dom/client'
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom'
import { browserHistory } from '@shared/utils/browser-history'
import { getEnvVariables } from '@shared/utils/get-env-variables'
import { isSsr } from '@shared/constants'
import Aoo from '@shared/pages/_app'
import Html from '@shared/pages/_document'

if (isSsr) {
  hydrateRoot(
    document,
    <HistoryRouter history={browserHistory}>
      <Html
        env={getEnvVariables()}
        title="Ssr app"
        description="Ssr react application"
      >
        <Aoo />
      </Html>
    </HistoryRouter>
  )
} else {
  createRoot(document.querySelector('#app') ?? document.body).render(
    <HistoryRouter history={browserHistory}>
      <Aoo />
    </HistoryRouter>
  )
}

if (module.hot) {
  module.hot.accept()
}
