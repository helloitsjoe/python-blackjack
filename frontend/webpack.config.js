const { makeWebpackConfig } = require('webpack-simple');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const htmlPlugin = new HtmlWebpackPlugin({
  template: './index-template.html',
  filename: '../dist/index.html',
});

const config = makeWebpackConfig({
  plugins: [
    htmlPlugin,
    new webpack.DefinePlugin({
      'process.env.MINIKUBE': JSON.stringify(process.env.MINIKUBE),
      'process.env.MINIKUBE_URL': JSON.stringify(process.env.MINIKUBE_URL),
    }),
  ],
  resolve: {
    alias: {
      react: 'preact/compat',
      'react-dom': 'preact/compat',
    },
  },
});

module.exports = config;
