import path from 'path'

export const replaceStar = (alias: unknown) =>
  typeof alias === 'string' ? alias.replace('/*', '') : ''

export const mapTsAliases = (
  paths: Record<string, string[]>
): Record<string, string> =>
  Object.fromEntries(
    Object.entries(paths).map(([alias, [tsPath]]) => [
      replaceStar(alias),
      path.resolve(process.cwd(), replaceStar(tsPath)),
    ])
  )
