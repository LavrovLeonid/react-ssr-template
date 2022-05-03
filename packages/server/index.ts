import 'dotenv/config'

import express from 'express'
import { isDevelopment } from '@shared/constants'
import { compressionMiddleware } from './middleware/compression'
import { staticMiddleware } from './middleware/static'
import { developmentMiddleware } from './middleware/development'
import { renderHandler } from './render-handler'

const app = express()

if (isDevelopment) {
  developmentMiddleware(app)
} else {
  compressionMiddleware(app)
}

staticMiddleware(app)

app.get('*', renderHandler)

app.listen(3000, () => {
  console.log('Server running on port 3000')
})
