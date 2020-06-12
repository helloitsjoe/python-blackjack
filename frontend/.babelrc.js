const makeBabelConfig = require('babel-react-simple');

const config = makeBabelConfig();
if (process.env.CYPRESS) {
  // This breaks jest tests, so only include it for cypress tests
  config.plugins.push('istanbul');
}

module.exports = config;
