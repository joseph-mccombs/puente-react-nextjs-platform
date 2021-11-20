import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { useText } from 'app/modules/theme/common';
import { useTranslation } from 'next-i18next';
import PropTypes from 'prop-types';
import React from 'react';

import useStyles from './counter-style';

function Counter(props) {
  const { t } = useTranslation('landing');
  const classes = useStyles();
  const text = useText();
  return (
    <div className={classes.counterWrap}>
      <Container fixed>
        <Grid container justify="center" alignItems="center" spacing={6}>
          <Grid md={4} item>
            <div className={classes.counterItem}>
              <div className={classes.text}>
                <Typography variant="h3" className={text.title}>
                  +200
                </Typography>
                <Typography component="p" className={text.subtitle}>
                  {t('common:landing.about_employee')}
                </Typography>
              </div>
            </div>
          </Grid>
          <Grid md={4} item>
            <div className={classes.counterItem}>
              <div className={classes.text}>
                <Typography variant="h3" className={text.title}>
                  +500
                </Typography>
                <Typography component="p" className={text.subtitle}>
                  {t('common:landing.about_projects')}
                </Typography>
              </div>
            </div>
          </Grid>
          <Grid md={4} item>
            <div className={classes.counterItem}>
              <div className={classes.text}>
                <Typography variant="h3" className={text.title}>
                  +300
                </Typography>
                <Typography component="p" className={text.subtitle}>
                  {t('common:landing.about_client')}
                </Typography>
              </div>
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

Counter.propTypes = {
  t: PropTypes.func.isRequired,
};

export default Counter;
