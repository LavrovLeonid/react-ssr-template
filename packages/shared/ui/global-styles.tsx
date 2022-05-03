import { FC } from 'react'
import { Global } from '@emotion/react'

const GlobalStyles: FC = () => (
  <Global
    styles={{
      '@font-face': {
        fontFamily: 'roboto',
        src: 'url(/fonts/roboto-regular.woff2)',
        fontWeight: 'normal',
        fontDisplay: 'swap',
      },
      body: {
        margin: 0,
        fontFamily: 'roboto',
      },
    }}
  />
)

export default GlobalStyles
