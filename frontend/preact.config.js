const webpack = require('webpack');

// webpack.DefinePlugin lets you define env vars that will
// be converted to values during build (and usable in browser)
module.exports = config => {
  config.plugins.push(
    new webpack.DefinePlugin({
      'process.env.MINIKUBE': JSON.stringify(process.env.MINIKUBE),
    })
  );
};
