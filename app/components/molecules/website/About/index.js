import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useText } from 'app/modules/theme/common';
import clsx from 'clsx';
import { useTranslation } from 'next-i18next';
import PropTypes from 'prop-types';
import React from 'react';

import Counter from '../Counter';
import useTitle from '../Title/title-style';
import TitleDeco from '../Title/WithDecoration';
import useStyles from './about-style';

function About() {
  // Theme breakpoints
  const theme = useTheme();
  const text = useText();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));

  // Translation function
  const { t } = useTranslation('landing');

  const classes = useStyles();
  const title = useTitle();
  return (
    <div className={classes.root}>
      <Container fixed>
        <Grid container spacing={6}>
          <Grid item md={5} xs={12}>
            <div>
              <TitleDeco text={t('common:landing.about_title')} />
              {isDesktop && (
                <div className={classes.puzzle}>
                  <div className={classes.pieceBig}>
                    <span />
                  </div>
                  <div className={classes.pieceSmallTop}>
                    <span />
                  </div>
                  <div className={classes.pieceSmallBottom}>
                    <span />
                  </div>
                </div>
              )}
            </div>
          </Grid>
          <Grid item md={7} xs={12}>
            <Typography className={clsx(title.default, text.subtitle)} variant="h4">
              {t('common:landing.about_subtitle')}
            </Typography>
            <Counter />
            <blockquote>
              {t('common:landing.about_quote')}
            </blockquote>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

// About.propTypes = {
//   t: PropTypes.func.isRequired,
// };

export default About;
