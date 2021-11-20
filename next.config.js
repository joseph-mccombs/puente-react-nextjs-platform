const path = require('path');
const { i18n } = require('./next-i18next.config.js');

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  i18n,
};
