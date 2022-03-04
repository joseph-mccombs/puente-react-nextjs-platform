import theme from 'app/modules/theme/palette';
import Head from 'next/head';
import brand from 'public/text/brand';
import React from 'react';

const HeadComponent = () => (
  <Head>
    <meta charSet="utf-8" />
    {/* Use minimum-scale=1 to enable GPU rasterization */}
    <meta
      name="description"
      content={brand.saas.desc}
    />
    {/* Favicon */}
    <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon.png" />
    <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png" />
    <link rel="manifest" href="/site.webmanifest" />
    <meta name="msapplication-TileColor" content="#da532c" />
    <meta name="theme-color" content="#ffffff" />
    {/* PWA primary color */}
    <meta name="theme-color" content={theme.oceanBlue.palette.primary.main} />
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
    />
    <link href="https://fonts.googleapis.com/css?family=Roboto+Condensed:400,700&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
    <link href="https://unpkg.com/ionicons@3.0.0/dist/css/ionicons.min.css" rel="stylesheet" />
    {/*  Facebook */}
    <meta property="author" content="luxi" />
    <meta property="og:site_name" content="puente-dr.org" />
    <meta property="og:locale" content="en_US" />
    <meta property="og:type" content="website" />
    {/*  Twitter */}
    <meta property="twitter:site" content="puente-dr.org" />
    <meta property="twitter:domain" content="puente-dr.org" />
    <meta property="twitter:creator" content="puente" />
    <meta property="twitter:card" content="summary" />
    <meta property="twitter:image:src" content="/images/saas-logo.png" />
    <meta property="og:url" content={brand.saas.url} />
    <meta property="og:title" content={brand.saas.desc} />
    <meta
      property="og:description"
      content={brand.saas.desc}
    />
    <meta name="twitter:site" content={brand.saas.url} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:image" content={brand.saas.img} />
    <meta property="og:image" content={brand.saas.img} />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
  </Head>
);

export default HeadComponent;
