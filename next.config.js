const path = require('path');
const withImages = require('next-images');
const { i18n } = require('./next-i18next.config.js');

module.exports = withImages({
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  i18n,
});
