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
      'process.env.LOCAL': JSON.stringify(process.env.LOCAL),
    }),
  ],
  resolve: {
    alias: {
      react: 'preact/compat',
      'react-dom': 'preact/compat',
      'react-dom/test-utils': 'preact/test-utils',
    },
  },
});

module.exports = config;
