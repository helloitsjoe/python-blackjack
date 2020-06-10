const makeBabelConfig = require('babel-react-simple');

const config = makeBabelConfig();
config.plugins.push('istanbul');

module.exports = config;
