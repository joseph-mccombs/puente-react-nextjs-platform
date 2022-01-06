import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import { useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useText } from 'app/modules/theme/common';
import clsx from 'clsx';
import { useTranslation } from 'next-i18next';
import routeLink from 'public/text/link';
import React, { useEffect, useState } from 'react';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';

import Title from '../Title/TitleSecondary';
import AuthFrame from './AuthFrame';
import useStyles from './form-style';
import SocialAuth from './SocialAuth';

function Login() {
  const classes = useStyles();
  const text = useText();
  const theme = useTheme();
  const { t } = useTranslation('commone');
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
      if (value !== values.password) {
        return false;
      }
      return true;
    });
  });

  const [check, setCheck] = useState(false);

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleCheck = (event) => {
    setCheck(event.target.checked);
  };

  const handleSubmit = () => {
    console.log('data submitted'); //eslint-disable-line
  };

  return (
    <AuthFrame title={t('common:login_title')} subtitle={t('common:login_subtitle')}>
      <div>
        <div className={classes.head}>
          <Title align={isMobile ? 'center' : 'left'}>
            {t('common:login')}
          </Title>
          <Button size="small" className={classes.buttonLink} href={routeLink.saas.register}>
            <Icon className={clsx(classes.icon, classes.signArrow)}>arrow_forward</Icon>
            {t('common:login_create')}
          </Button>
        </div>
        <SocialAuth />
        <div className={classes.separator}>
          <Typography>
            {t('common:login_or')}
          </Typography>
        </div>
        <ValidatorForm
          onError={(errors) => console.log(errors)} //eslint-disable-line
          onSubmit={handleSubmit}
        >
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextValidator
                variant="filled"
                className={classes.input}
                label={t('common:login_email')}
                onChange={handleChange('email')}
                name="email"
                value={values.email}
                validators={['required', 'isEmail']}
                errorMessages={['This field is required', 'Email is not valid']}
              />
            </Grid>
            <Grid item xs={12}>
              <TextValidator
                variant="filled"
                type="password"
                className={classes.input}
                label={t('common:login_password')}
                validators={['required']}
                onChange={handleChange('password')}
                errorMessages={['This field is required']}
                name="password"
                value={values.password}
              />
            </Grid>
          </Grid>
          <div className={classes.formHelper}>
            <FormControlLabel
              control={(
                <Checkbox
                  checked={check}
                  onChange={(e) => handleCheck(e)}
                  color="secondary"
                  value={check}
                  className={classes.check}
                />
              )}
              label={(
                <span className={text.caption}>
                  {t('common:login_remember')}
                </span>
              )}
            />
            <Button size="small" className={classes.buttonLink} href="#">
              {t('common:login_forgot')}
            </Button>
          </div>
          <div className={classes.btnArea}>
            <Button variant="contained" fullWidth type="submit" color="secondary" size="large">
              {t('common:continue')}
            </Button>
          </div>
        </ValidatorForm>
      </div>
    </AuthFrame>
  );
}

export default Login;
