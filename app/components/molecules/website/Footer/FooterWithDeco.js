import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useText } from 'app/modules/theme/common';
import { useTranslation } from 'next-i18next';
import React from 'react';

import Footer from './Footer';
import useStyles from './footer-style';

function FooterWithDeco() {
  const classes = useStyles();
  const text = useText();

  const { t } = useTranslation('saas-landing');
  return (
    <div className={classes.footerDeco}>
      <div className={classes.decoration}>
        <svg className={classes.leftDeco}>
          <use xlinkHref="/images/saas/deco-bg-left.svg#main" />
        </svg>
        <svg className={classes.rightDeco}>
          <use xlinkHref="/images/saas/deco-bg-right.svg#main" />
        </svg>
      </div>
      <div className={classes.action}>
        <Typography variant="h4" className={text.title2}>
          {t('common:saas-landing.footer_waiting')}
        </Typography>
        <Button variant="contained" color="secondary" size="large">
          {t('common:saas-landing.getstarted')}
        </Button>
      </div>
      <Footer />
    </div>
  );
}

export default FooterWithDeco;
