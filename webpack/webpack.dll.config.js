const webpack = require('webpack')
const path = require('path')

const vendor = [
    'react',
    'react-dom',
    'rxjs',
    'classnames',
    'babel-polyfill'
]

module.exports = {
  entry: {
    vendor: vendor
  },
  output: {
    path: path.resolve(__dirname, '../common'),
    filename: '[name].js',
    library: '[name]'
  },
  plugins: [
      new webpack.DllPlugin({
        path: path.resolve(__dirname, '../common/manifest.json'),
        name: '[name]',
        context: __dirname
      })
  ]
}