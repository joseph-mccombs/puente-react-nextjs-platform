const path = require('path');

module.exports = {
  i18n: {
    defaultLocale: 'eng',
    locales: ['eng'],
    fallbackLng: 'eng',
    initImmediate: false,
    localePath: path.resolve('./public/locales'),
    react: {
      useSuspense: false,
    },
    localeSubpaths: {
      ara: 'ar',
      deu: 'de',
      eng: 'en',
      ind: 'id',
      prt: 'pt',
      zho: 'zh',
    },
  },
};
