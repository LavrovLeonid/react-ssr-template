import path from 'path'
import { Configuration } from 'webpack'
import nodeExternals from 'webpack-node-externals'
import merge from 'webpack-merge'
import webpackCommonConfiguration from './webpack.common'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import { mapTsAliases } from './utils/map-ts-aliases'

import tsConfig from '../tsconfig.json'

const webpackProductionClientConfiguration = merge(webpackCommonConfiguration, {
  mode: 'production',
  devtool: 'source-map',
  output: {
    filename: '[name]-chunk-[contenthash].js',
  },
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false,
    }),
  ],
})

const webpackProductionServerConfiguration: Configuration = {
  mode: 'production',
  externalsPresets: { node: true },
  target: 'node',
  externals: [nodeExternals()],
  entry: path.join(process.cwd(), 'packages', 'server', 'index.ts'),
  output: {
    clean: true,
    filename: 'index.js',
    path: path.resolve(process.cwd(), '.build', 'server'),
  },
  resolve: {
    extensions: ['.ts', '.tsx'],
    alias: mapTsAliases(tsConfig.compilerOptions.paths),
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false,
    }),
  ],
}

export default [
  webpackProductionClientConfiguration,
  webpackProductionServerConfiguration,
]
