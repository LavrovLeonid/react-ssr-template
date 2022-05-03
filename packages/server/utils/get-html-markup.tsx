import Html, { HtmlProps } from '@shared/pages/_document'
import { renderToStaticMarkup } from 'react-dom/server'

export const getHtmlMarkup = (htmlProps: HtmlProps) =>
  `<!DOCTYPE html>${renderToStaticMarkup(<Html {...htmlProps} />)}`
