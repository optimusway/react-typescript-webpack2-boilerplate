const webpack = require('webpack')
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    app: [
      'react-hot-loader/patch',
      // activate HMR for React

      'webpack-dev-server/client?http://localhost:3000',
      // bundle the client for webpack-dev-server
      // and connect to the provided endpoint

      'webpack/hot/only-dev-server',
      // bundle the client for hot reloading
      // only- means to only hot reload for successful updates

      path.join(__dirname, './src', './index.tsx'),
    ]
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, './dist'),
    publicPath: '/'
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: "source-map-loader"
      },
      {
        enforce: 'pre',
        test: /\.tsx?$/,
        use: "source-map-loader"
      },
      {
        test: /\.tsx?$/,
        use: [
          { loader: 'react-hot-loader/webpack' },
          { loader: 'awesome-typescript-loader' },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: 'css-loader'
        })
      }
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    hot: true,

    contentBase: path.resolve(__dirname, './dist'),
    // match the output path

    publicPath: '/'
    // match the output `publicPath`
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // enable HMR globally

    new HtmlWebpackPlugin({
      template: path.join(__dirname, './public', 'index.html')
    }),
    new ExtractTextPlugin('styles.css'),
  ]
};
