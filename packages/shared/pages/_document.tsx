import { FC, ReactNode } from 'react'

export interface HtmlProps {
  assets?: string[]
  env?: string
  title: string
  description?: string
  children?: ReactNode
}

const Html: FC<HtmlProps> = ({
  assets = [],
  children,
  title,
  env,
  description,
}) => (
  <html lang="ru">
    <head>
      <meta charSet="utf-8" />
      <title>{title}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#008000" />
      <link rel="apple-touch-icon" href="apple-touch-icon.png" />
      <link rel="manifest" href="manifest.json" />
      <link
        rel="preload"
        href="fonts/roboto-regular.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />
      {description && <meta name="description" content={description} />}
      <link rel="shortcut icon" href="favicon.ico" />
      {env && (
        <script
          id="env"
          dangerouslySetInnerHTML={{
            __html: env,
          }}
        />
      )}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            if ("serviceWorker" in navigator) {
              navigator.serviceWorker.register("/sw.js")
            }
        `,
        }}
      />
    </head>
    <body>
      <main id="app">{children}</main>
      {assets.map((path) => (
        <script key={path} src={path} async />
      ))}
    </body>
  </html>
)

export default Html
