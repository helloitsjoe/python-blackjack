const makeBabelConfig = require('babel-react-simple');

const config = makeBabelConfig();

// config.plugins.push('istanbul');
// config.env = { test: { plugins: ['istanbul'] } };

module.exports = config;
