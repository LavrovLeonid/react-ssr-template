/* eslint-disable require-jsdoc */
import { Compiler } from 'webpack'
import path from 'path'
import fs from 'fs'

export interface AssetsPluginOptions {
  path?: string
  entryPointsFileName?: string
  assetsFileName?: string
}

export class AssetsPlugin {
  path: string
  entryPointsFileName: string
  assetsFileName: string

  constructor({
    path = process.cwd(),
    entryPointsFileName = 'entryPoints.json',
    assetsFileName = 'assets.json',
  }: AssetsPluginOptions = {}) {
    this.path = path
    this.entryPointsFileName = entryPointsFileName
    this.assetsFileName = assetsFileName
  }

  apply(compiler: Compiler) {
    compiler.hooks.emit.tapAsync(
      { name: 'EntryPoints' },
      (compilation, callback) => {
        const {
          entrypoints: { main: { assets: entryPointsAssets = [] } } = {},
          publicPath = '',
          assetsByChunkName = {},
        } = compilation.getStats().toJson()

        fs.mkdirSync(this.path, { recursive: true })

        const entryPoints = entryPointsAssets.map(({ name }) =>
          path.resolve(publicPath, name)
        )
        const assets = Object.values(assetsByChunkName)
          .map(([name]) => path.resolve(publicPath, name))
          .filter((asset) => !entryPoints.includes(asset))

        fs.writeFileSync(
          path.resolve(this.path, this.assetsFileName),
          JSON.stringify(assets, null, 2)
        )
        fs.writeFileSync(
          path.resolve(this.path, this.entryPointsFileName),
          JSON.stringify(entryPoints, null, 2)
        )

        callback()
      }
    )
  }
}
