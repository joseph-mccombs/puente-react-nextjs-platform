import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Popover from '@material-ui/core/Popover';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';
import CheckIcon from '@material-ui/icons/Check';
import SettingsIcon from '@material-ui/icons/Settings';
import clsx from 'clsx';
import { i18n, useTranslation } from 'next-i18next';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

import useStyles from './header-style';

let themeType = 'light';
if (typeof Storage !== 'undefined') {
  themeType = localStorage.getItem('luxiTheme') || 'light';
}

function Settings(props) {
  const [ctn, setCtn] = useState(null);
  const classes = useStyles();
  const { t } = useTranslation(['common', 'saas-landing']);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isDark, setDark] = useState(themeType === 'dark');

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  const handleChangeMode = () => {
    setDark(!isDark);
    props.toggleDark();
  };

  function handleChangeLang(lang) {
    if (lang === 'ara') {
      i18n.changeLanguage('ara');
      props.toggleDir('rtl');
    } else {
      i18n.changeLanguage(lang);
      props.toggleDir('ltr');
    }
    setAnchorEl(null);
  }

  useEffect(() => {
    setCtn(document.getElementById('main-wrap'));
  });

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  const { invert } = props;
  return (
    <div className={classes.setting}>
      <IconButton
        aria-describedby={id}
        aria-label="Settings"
        onClick={handleClick}
        className={
          clsx(
            classes.icon,
            open && classes.active,
            invert && classes.invert,
          )
        }
      >
        <SettingsIcon fontSize="inherit" />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        container={ctn}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <List
          component="nav"
          className={classes.modeMenu}
          aria-label="Mode-menu"
          subheader={(
            <ListSubheader component="div">
              {t('common:saas-landing.header_theme')}
            </ListSubheader>
          )}
        >
          <ListItem>
            <Typography component="div">
              <Grid component="label" container alignItems="center" spacing={1}>
                <Grid item>
                  {t('common:saas-landing.header_light')}
                </Grid>
                <Grid item>
                  <Switch
                    checked={isDark}
                    onChange={handleChangeMode}
                    value={isDark}
                    inputProps={{ 'aria-label': 'checkbox' }}
                  />
                </Grid>
                <Grid item>
                  {t('common:saas-landing.header_dark')}
                </Grid>
              </Grid>
            </Typography>
          </ListItem>
        </List>
        <Divider />
        <List
          component="nav"
          className={classes.langMenu}
          aria-label="Language-menu"
          subheader={(
            <ListSubheader component="div">
              {t('common:saas-landing.header_language')}
            </ListSubheader>
          )}
        >
          {i18n.options.allLanguages && i18n.options.allLanguages.map((val) => (
            <ListItem
              key={val}
              role={undefined}
              dense
              button
              onClick={() => handleChangeLang(val)}
            >
              <ListItemIcon>
                <i className={val} />
              </ListItemIcon>
              <ListItemText primary={t(`common:${val}`)} />
              {i18n.language === val && (
                <ListItemSecondaryAction>
                  <CheckIcon color="primary" />
                </ListItemSecondaryAction>
              )}
            </ListItem>
          ))}
        </List>
      </Popover>
    </div>
  );
}

Settings.propTypes = {
  toggleDark: PropTypes.func.isRequired,
  toggleDir: PropTypes.func.isRequired,
  invert: PropTypes.bool,
};

Settings.defaultProps = {
  invert: false,
};

export default Settings;
