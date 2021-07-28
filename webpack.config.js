const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

const esLintPlugin = (isDev) => isDev ? [] : [ new ESLintPlugin({ extensions: ['ts', 'js'] }) ];

module.exports = ({ develop }) => ({
  mode: develop ? 'development' : 'production',
  entry: { app: './src/index.ts' },
  devtool: develop ? 'inline-source-map' : false,
  devServer: { contentBase: path.join(__dirname, 'public') },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: { filename: 'assets/images/[name].[hash][ext]' }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: { filename: 'assets/fonts/[name].[hash][ext]' }
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      }
    ],
  },
  resolve: { extensions: ['.ts', '.js'] },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: 'assets/[name].[hash][ext]',
    clean: { keep: /assets\// }
  },
  plugins: [
    new HtmlWebpackPlugin({
      favicon: './public/favicon.ico',
      title: 'TITLE'
    }),
    new MiniCssExtractPlugin({ filename: '[name].[contenthash].css' }),
    new CopyPlugin({ patterns: [{ from: './public' }]}),
    ...esLintPlugin(develop)
  ]
});
