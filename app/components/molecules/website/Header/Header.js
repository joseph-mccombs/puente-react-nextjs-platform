import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import clsx from 'clsx';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import PropTypes from 'prop-types';
// import logo from 'public/images/agency-logo.svg';
import brand from 'public/text/brand';
import routeLink from 'public/text/link';
import React, { Fragment, useEffect, useState } from 'react';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import Scrollspy from 'react-scrollspy';

import useStyles from './header-style';
import navMenu from './menu';
import MobileMenu from './MobileMenu';
import Settings from './Settings';

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

const LinkBtn = React.forwardRef(function LinkBtn(props, ref) { // eslint-disable-line
  return <AnchorLink to={props.to} {...props} innerRef={ref} />; // eslint-disable-line
});

function Header(props) {
  // Theme breakpoints
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  const [fixed, setFixed] = useState(false);
  let flagFixed = false;
  const handleScroll = () => {
    const doc = document.documentElement;
    const scroll = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
    const newFlagFixed = (scroll > 80);
    if (flagFixed !== newFlagFixed) {
      setFixed(newFlagFixed);
      flagFixed = newFlagFixed;
    }
  };
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
  }, []);
  const classes = useStyles();
  const {
    onToggleDark,
    onToggleDir,
    invert,
  } = props;
  const { t } = useTranslation('landing');
  const [menuList] = useState([
    createData(navMenu[0], `#${navMenu[0]}`, 200),
    createData(navMenu[1], `#${navMenu[1]}`, 200),
    createData(navMenu[2], `#${navMenu[2]}`, 200),
    createData(navMenu[3], `#${navMenu[3]}`, 200),
  ]);
  const [openDrawer, setOpenDrawer] = useState(false);
  const handleOpenDrawer = () => {
    setOpenDrawer(!openDrawer);
  };
  return (
    <>
      { isMobile && (<MobileMenu open={openDrawer} toggleDrawer={handleOpenDrawer} />) }
      <AppBar
        component="div"
        position="relative"
        id="header"
        className={clsx(
          classes.header,
          fixed && classes.fixed,
          openDrawer && classes.openDrawer,
        )}
      >
        <Container fixed={isDesktop}>
          <div className={classes.headerContent}>
            <nav className={clsx(classes.navLogo, invert && classes.invert)}>
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
              {/* <div className={classes.logo}>
                {invert ? (
                  <Link href={routeLink.agency.home}>
                    <a>
                      <img src={logo} alt="logo" />
                      {brand.agency.name}
                    </a>
                  </Link>
                ) : (
                  <AnchorLink href="#home">
                    <img src={logo} alt="logo" />
                    {brand.agency.name}
                  </AnchorLink>
                )}
              </div> */}
            </nav>
            <nav className={clsx(classes.navMenu, invert && classes.invert)}>
              {isDesktop && (
                <Scrollspy
                  items={navMenu}
                  currentClassName="active"
                >
                  {menuList.map((item) => (
                    <li key={item.id.toString()}>
                      {invert ? (
                        // eslint-disable-next-line
                        <Button href={'/' + item.url}>
                          {t(`common:landing.header_${item.name}`)}
                        </Button>
                      ) : (
                        // eslint-disable-next-line
                        <Button component={AnchorLink} offset={item.offset || 0} href={item.url}>
                          {t(`common:landing.header_${item.name}`)}
                        </Button>
                      )}
                    </li>
                  ))}
                  <li>
                    <Button href={routeLink.agency.contact}>
                      {t('common:landing.header_contact')}
                    </Button>
                  </li>
                </Scrollspy>
              )}
              <Settings toggleDark={onToggleDark} toggleDir={onToggleDir} invert={invert} />
            </nav>
          </div>
        </Container>
      </AppBar>
    </>
  );
}

Header.propTypes = {
  onToggleDark: PropTypes.func.isRequired,
  onToggleDir: PropTypes.func.isRequired,
  invert: PropTypes.bool,
  t: PropTypes.func.isRequired,
};

Header.defaultProps = {
  invert: false,
};

export default Header;
