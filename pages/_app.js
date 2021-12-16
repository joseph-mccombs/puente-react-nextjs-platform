/* import css vendors */
import 'styles/landing-page/hamburger-menu.css';
import '../node_modules/animate.css/animate.css';
import 'styles/landing-page/animate-extends.css';
import 'styles/landing-page/top-loading-bar.css';
import 'styles/landing-page/page-transition.css';
import 'styles/landing-page/slick/slick.css';
import 'styles/landing-page/slick/slick-theme.css';

import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from 'app/modules/theme';
import { AppWrapper } from 'app/store'; // import based on where you put it
import Head from 'next/head';
import { appWithTranslation } from 'next-i18next';
import PropTypes from 'prop-types';
import React from 'react';

import nextI18NextConfig from '../next-i18next.config.js';

const App = (props) => {
  const { Component, pageProps } = props;

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <Head>
        <title>Puente</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <AppWrapper>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </AppWrapper>

    </>
  );
};

export default appWithTranslation(App, nextI18NextConfig);

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired, //eslint-disable-line
};
