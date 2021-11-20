import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import SendIcon from '@material-ui/icons/Send';
import { useTranslation } from 'next-i18next';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

import useStyles from './action-style';

function CallAction(props) {
  // Theme breakpoints
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  // Translation Function
  const { t } = useTranslation('landing');

  const classes = useStyles();
  return (
    <>
      <svg
        fill="#cccccc"
        width={845}
        height={1099}
        className={classes.background}
      >
        <use xlinkHref="/images/decoration/square-deco-primary.svg#square" />
      </svg>
      <Container fixed={isDesktop}>
        <div className={classes.root}>
          <Paper className={classes.paper}>
            <Grid container alignItems="center">
              <Grid item md={9} xs={12}>
                <Typography variant="h4" gutterBottom display="block">
                  {t('common:landing.cta_title')}
                </Typography>
                <Typography display="block" component="div">
                  {t('common:landing.cta_subtitle')}
                </Typography>
              </Grid>
              <Grid item md={3} xs={12}>
                <Grid container alignItems="center">
                  <Button size="large" variant="outlined" color="secondary" href="/contact" className={classes.button}>
                    {t('common:landing.cta_btn')}
                    <SendIcon className={classes.rightIcon} />
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </div>
      </Container>
    </>
  );
}

CallAction.propTypes = {
  t: PropTypes.func.isRequired,
};

export default CallAction;
