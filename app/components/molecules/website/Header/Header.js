import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import clsx from 'clsx';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import PropTypes from 'prop-types';
import logo from 'public/images/saas-logo.svg';
import brand from 'public/text/brand';
import link from 'public/text/link';
import React, { Fragment, useEffect, useState } from 'react';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import Scrollspy from 'react-scrollspy';

import useStyles from './header-style';
import navMenu from './menu';
import MobileMenu from './MobileMenu';

let counter = 0;
function createData(name, url, offset) {
  counter += 1;
  return {
    id: counter,
    name,
    url,
    offset,
  };
}

function Header(props) {
  const [fixed, setFixed] = useState(false);
  let flagFixed = false;
  const handleScroll = () => {
    const doc = document.documentElement;
    const scroll = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
    const newFlagFixed = (scroll > 100);
    if (flagFixed !== newFlagFixed) {
      setFixed(newFlagFixed);
      flagFixed = newFlagFixed;
    }
  };
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
  }, []);
  const classes = useStyles();
  const theme = useTheme();
  const {
    invert,
  } = props;

  const { t } = useTranslation('saas-landing');

  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [menuList] = useState([
    createData(navMenu[0], `#${navMenu[0]}`),
    createData(navMenu[1], `#${navMenu[1]}`),
    createData(navMenu[2], `#${navMenu[2]}`),
    createData(navMenu[3], `#${navMenu[3]}`, -40),
  ]);
  const [openDrawer, setOpenDrawer] = useState(false);
  const handleOpenDrawer = () => {
    setOpenDrawer(!openDrawer);
  };
  return (
    <>
      { isMobile && (<MobileMenu open={openDrawer} toggleDrawer={handleOpenDrawer} />) }
      <AppBar
        component="header"
        position="relative"
        id="header"
        className={clsx(
          classes.header,
          fixed && classes.fixed,
          invert && classes.invert,
          openDrawer && classes.openDrawer,
        )}
      >
        <Container fixed={isDesktop}>
          <div className={classes.headerContent}>
            <nav className={classes.navMenu}>
              { isMobile && (
                <IconButton
                  onClick={handleOpenDrawer}
                  className={clsx('hamburger hamburger--spin', classes.mobileMenu, openDrawer && 'is-active')}
                >
                  <span className="hamburger-box">
                    <span className={clsx(classes.bar, 'hamburger-inner')} />
                  </span>
                </IconButton>
              )}
              <div className={classes.logo}>
                {invert ? (
                  <Link href={link.saas.home}>
                    <a>
                      <img src={logo} alt="logo" />
                      {!isMobile && "Puente"}
                    </a>
                  </Link>
                ) : (
                  <AnchorLink href="#home">
                    <img src={logo} alt="logo" />
                    {!isMobile && ""} {/**THIS IS WHERE PUENTE TECHNOLOGY SHOULD GO */}
                  </AnchorLink>
                )}
              </div>
              {isDesktop && (
                <Scrollspy
                  items={navMenu}
                  currentClassName="active"
                >
                  {menuList.map((item) => (
                    <li key={item.id.toString()}>
                      {invert ? (
                        // eslint-disable-next-line
                        <Button offset={item.offset || 0} href={'/' + item.url}>
                          {t(`common:saas-landing.header_${item.name}`)}
                        </Button>
                      ) : (
                        <Button component={AnchorLink} offset={item.offset || 0} href={item.url}>
                          {t(`common:saas-landing.header_${item.name}`)}
                        </Button>
                      )}
                    </li>
                  ))}
                  <li>
                    <Button href={link.saas.contact}>
                      {t('common:saas-landing.header_contact')}
                    </Button>
                  </li>
                </Scrollspy>
              )}
            </nav>
            <nav className={classes.navMenu}>
              <Hidden xsDown>
                <Button href={link.saas.login} className={classes.textBtn}>
                  Login
                </Button>
                <Button href={link.saas.register} variant="contained" color="secondary" className={classes.button}>
                  Register
                </Button>
              </Hidden>
            </nav>
          </div>
        </Container>
      </AppBar>
    </>
  );
}

Header.propTypes = {
  invert: PropTypes.bool,
};

Header.defaultProps = {
  invert: false,
};

export default Header;
