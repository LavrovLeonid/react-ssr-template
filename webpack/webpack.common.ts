import path from 'path'
import { Configuration } from 'webpack'
import CopyPlugin from 'copy-webpack-plugin'
import { AssetsPlugin } from './plugins/entry-points'
import { mapTsAliases } from './utils/map-ts-aliases'

import tsConfig from '../tsconfig.json'

const cwd = process.cwd()

const webpackCommonConfiguration: Configuration = {
  entry: [path.resolve(cwd, 'packages', 'browser', 'index.tsx')],
  output: {
    clean: true,
    path: path.resolve(cwd, '.build', 'client'),
    publicPath: '/client/',
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    alias: mapTsAliases(tsConfig.compilerOptions.paths),
  },
  optimization: {
    moduleIds: 'deterministic',
    runtimeChunk: {
      name: 'webpack',
    },
    splitChunks: {
      cacheGroups: {
        framework: {
          test: /[\\/]node_modules[\\/](react|react-dom|scheduler)[\\/]/,
          name: 'framework',
          chunks: 'initial',
        },
        vendor: {
          test: /node_modules/,
          name: 'vendors',
          chunks: 'initial',
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
  plugins: [
    new AssetsPlugin({
      path: path.resolve(cwd, '.build'),
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(cwd, 'public'),
          to: path.resolve(cwd, '.build', 'public'),
        },
      ],
    }),
  ],
}

export default webpackCommonConfiguration
