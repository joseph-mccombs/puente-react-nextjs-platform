import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import LayerIcon from '@material-ui/icons/Layers';
import ArrowIcon from '@material-ui/icons/Reply';
import UsersIcon from '@material-ui/icons/SupervisorAccount';
import { useText } from 'app/modules/theme/common';
import { useTranslation } from 'next-i18next';
import React, { useState } from 'react';
import CountUp from 'react-countup';
import ReactWOW from 'react-wow';

import useStyles from './counter-style';

function Counter() {
  const classes = useStyles();
  const text = useText();
  const [play, setPlay] = useState(false);
  const { t } = useTranslation('saas-landing');
  const countup = (val, isPlay) => (
    <span>
      {isPlay ? <CountUp end={val} /> : 0}
    </span>
  );
  const handlePlay = () => {
    setTimeout(() => { setPlay(true); }, 200);
  };
  return (
    <div className={classes.counterWrap}>
      <Container>
        <ReactWOW animation="fadeIn" offset={-100} callback={handlePlay}>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            className={classes.counterInner}
            spacing={6}
          >
            <Grid md={4} item>
              <div className={classes.counterItem}>
                <div className={classes.text}>
                  <Typography variant="h3" className={text.title}>
                    {countup(12, play)}
                    &nbsp;
                    {t('common:saas-landing.counter_month')}
                  </Typography>
                  <Typography component="p" className={text.subtitle}>
                    <ArrowIcon />
                    {t('common:saas-landing.counter_free')}
                  </Typography>
                </div>
              </div>
            </Grid>
            <Grid md={4} item>
              <div className={classes.counterItem}>
                <div className={classes.text}>
                  <Typography variant="h3" className={text.title}>
                    +
                    {countup(80, play)}
                    M
                  </Typography>
                  <Typography component="p" className={text.subtitle}>
                    <UsersIcon />
                    {t('common:saas-landing.counter_users')}
                  </Typography>
                </div>
              </div>
            </Grid>
            <Grid md={4} item>
              <div className={classes.counterItem}>
                <div className={classes.text}>
                  <Typography variant="h3" className={text.title}>
                    +
                    {countup(180, play)}
                    K
                  </Typography>
                  <Typography component="p" className={text.subtitle}>
                    <LayerIcon />
                    {t('common:saas-landing.counter_providers')}
                  </Typography>
                </div>
              </div>
            </Grid>
          </Grid>
        </ReactWOW>
      </Container>
    </div>
  );
}

export default Counter;
