import { Theme as CustomTheme } from '@shared/ui/theme'

export {}

declare module '@emotion/react' {
  // eslint-disable-next-line no-unused-vars -- Override
  interface Theme extends CustomTheme {}
}
