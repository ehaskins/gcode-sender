const path = require('path')
const PnpWebpackPlugin = require(`pnp-webpack-plugin`)
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './entry-points/app.tsx',
  context: path.resolve(__dirname, '../src'),
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    plugins: [PnpWebpackPlugin],
  },
  resolveLoader: {
    plugins: [PnpWebpackPlugin.moduleLoader(module)],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Yet Another GCode Sender',
      template: 'index.ejs',
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    compress: true,
    port: 9000,
  },
}
