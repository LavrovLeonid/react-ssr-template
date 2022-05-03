import fs from 'fs'
import path from 'path'

export const getEntryPoints = (): string[] =>
  JSON.parse(
    fs.readFileSync(
      path.resolve(process.cwd(), '.build', 'entryPoints.json'),
      'utf-8'
    )
  )
