const webpack = require('webpack')
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  entry: {
    app: [
      'react-hot-loader/patch',
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
          fallback: 'style-loader',
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
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, './public', 'index.html')
    }),
    new ExtractTextPlugin({
      filename: 'styles.css',
      disable: !isProduction
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module) {
        // this assumes your vendor imports exist in the node_modules directory
        return module.context && module.context.indexOf('node_modules') !== -1;
      }
    }),
    //CommonChunksPlugin will now extract all the common modules from vendor and main bundles
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest' //But since there are no more common modules between them we end up with just the runtime code included in the manifest file
    })
  ]
};
