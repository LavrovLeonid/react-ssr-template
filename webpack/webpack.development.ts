import merge from 'webpack-merge'
import { HotModuleReplacementPlugin } from 'webpack'
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin'
import webpackCommonConfiguration from './webpack.common'

const webpackDevelopmentConfiguration = merge(webpackCommonConfiguration, {
  mode: 'development',
  entry: ['webpack-hot-middleware/client?path=/__hmr&timeout=20000'],
  devtool: 'inline-source-map',
  plugins: [new HotModuleReplacementPlugin(), new ReactRefreshWebpackPlugin()],
})

export default webpackDevelopmentConfiguration
