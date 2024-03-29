import Container from '@material-ui/core/Container';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
// import InputAdornment from '@material-ui/core/InputAdornment';
import Link from '@material-ui/core/Link';
// import MenuItem from '@material-ui/core/MenuItem';
// import OutlinedInput from '@material-ui/core/OutlinedInput';
// import Select from '@material-ui/core/Select';
import { useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import LangIcon from '@material-ui/icons/Language';
import clsx from 'clsx';
import { i18n } from 'next-i18next';
import PropTypes from 'prop-types';
import logo from 'public/images/saas-logo.svg';
// import brand from 'public/text/brand';
import React, { useEffect, useState } from 'react';

import useStyles from './footer-style';

function Copyright() {
  return (
    <Typography variant="body2" display="block" align="center" color="textSecondary">
      &copy;&nbsp;
      Puente Tech 2022
    </Typography>
  );
}

// const footers = [
//   {
//     title: 'Company',
//     description: ['Team', 'History', 'Contact us', 'Locations'],
//     link: ['#team', '#history', '#contact-us', '#locations'],
//   },
//   {
//     title: 'Resources',
//     description: ['Resource', 'Resource name', 'Another resource', 'Final resource'],
//     link: ['#resource', '#resource-name', '#another-resource', '#final-resource'],
//   },
//   {
//     title: 'Legal',
//     description: ['Privacy policy', 'Terms of use', 'Terms Condition'],
//     link: ['#privacy-policy', '#terms-of-use'],
//   },
// ];

const footers = [
  {
    title: '',
    description: [''],
    link: [''],
  },
];

function Footer(props) {
  const [, setCtn] = useState(null);
  const classes = useStyles();
  const { invert } = props;
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [, setValues] = useState({
    lang: 'eng',
  });

  useEffect(() => {
    setValues({ lang: i18n.language });
    setCtn(document.getElementById('main-wrap'));
  }, []);

  // function handleChange(event) {
  //   setValues((oldValues) => ({
  //     ...oldValues,
  //     [event.target.name]: event.target.value,
  //   }));
  //   if (event.target.value === 'ara') {
  //     i18n.changeLanguage('ara');
  //     props.toggleDir('rtl');
  //   } else {
  //     i18n.changeLanguage(event.target.value);
  //     props.toggleDir('ltr');
  //   }
  // }

  return (
    <Container
      maxWidth="lg"
      component="footer"
      className={clsx(classes.footer, invert && classes.invert)}
    >
      <Grid container spacing={4}>
        <Grid item xs={12} md={3}>
          <div className={classes.logo}>
            <img src={logo} alt="logo" />
            <Typography variant="h6" color="textPrimary">
              Puente
            </Typography>
          </div>
          <Copyright />
        </Grid>
        <Grid item xs={12} md={6}>
          <Grid container spacing={4} justifyContent="space-evenly">
            {footers.map((footer) => (
              <Grid item xs={12} md={3} key={footer.title} className={classes.siteMapItem}>
                {isDesktop && (
                  <div>
                    <Typography variant="h6" className={classes.title} color="textPrimary" gutterBottom>
                      {footer.title}
                    </Typography>
                    <ul>
                      {footer.description.map((item, index) => (
                        <li key={item}>
                          <Link href={footer.link[index]} variant="subtitle1" color="textSecondary">
                            {item}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {isMobile && (
                  <ExpansionPanel
                    square
                    classes={{
                      root: classes.accordionRoot,
                    }}
                  >
                    <ExpansionPanelSummary
                      expandIcon={<ExpandMoreIcon className={classes.accordionIcon} />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                      classes={{
                        content: classes.accordionContent,
                      }}
                    >
                      <strong>
                        {footer.title}
                      </strong>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                      <ul>
                        {footer.description.map((item, index) => (
                          <li key={item}>
                            <Link href={footer.link[index]} variant="subtitle1" color="textSecondary">
                              {item}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </ExpansionPanelDetails>
                  </ExpansionPanel>
                )}
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item xs={12} md={3}>
          <div className={classes.socmed}>
            <IconButton aria-label="FB" className={classes.margin} size="small">
              <i className="ion-logo-facebook" />
            </IconButton>
            {/* <IconButton aria-label="TW" className={classes.margin} size="small">
              <i className="ion-logo-twitter" />
            </IconButton> */}
            <IconButton aria-label="IG" className={classes.margin} size="small">
              <i className="ion-logo-instagram" />
            </IconButton>
            <IconButton aria-label="LI" className={classes.margin} size="small">
              <i className="ion-logo-linkedin" />
            </IconButton>
          </div>
          {/* <Select
            value={values.lang}
            onChange={handleChange}
            MenuProps={{
              container: ctn,
            }}
            startAdornment={(
              <InputAdornment className={classes.icon} position="start">
                <LangIcon />
              </InputAdornment>
            )}
            className={classes.selectLang}
            input={<OutlinedInput labelWidth={200} name="lang" id="outlined-lang-simple" />}
          >
            <MenuItem value="eng">English</MenuItem>
            <MenuItem value="deu">Deutsch</MenuItem>
            <MenuItem value="ara">العربيّة</MenuItem>
            <MenuItem value="ind">Bahasa Indonesia</MenuItem>
            <MenuItem value="prt">Português</MenuItem>
            <MenuItem value="zho">简体中文</MenuItem>
          </Select> */}
        </Grid>
      </Grid>
    </Container>
  );
}

Footer.propTypes = {
  invert: PropTypes.bool,
  // toggleDir: PropTypes.func,
};

Footer.defaultProps = {
  invert: false,
  // toggleDir: () => {},
};

export default Footer;
