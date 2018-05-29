const HtmlWebPackPlugin = require('html-webpack-plugin')

const htmlPlugin = new HtmlWebPackPlugin({
  template: './src/index.html',
  filename: './index.html'
})

module.exports = {
  entry: './src/index.js',
  module: {
    rules: [
      {test: /\.(jsx|js)$/, exclude: /node_modules/, use: {loader: 'babel-loader'}},
      {test: /\.css$/, use: ['style-loader', 'css-loader']},
      {test: /\.(woff(2)?|ttf|eot|svg|png|otf)(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader'}
    ]
  },
  plugins: [
    htmlPlugin
  ],
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000'
      }
    }
  }
}
