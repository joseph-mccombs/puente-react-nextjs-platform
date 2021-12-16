import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'next-i18next';
import PropTypes from 'prop-types';
import React from 'react';

import useStyles from './cards-style';

function News(props) {
  const classes = useStyles();
  const {
    text,
    img,
    type,
  } = props;

  const { t } = useTranslation('saas-landing');
  return (
    <div className={classes.news}>
      <figure>
        <img src={img} alt="thumb" />
      </figure>
      <div className={classes.desc}>
        <div className={classes.text}>
          <Typography variant="caption" className={classes.type}>
            {t(`common:saas-landing.${type}`)}
          </Typography>
          <Typography display="block" component="p">{text}</Typography>
        </div>
        <Button size="small" className={classes.btn}>
          {t('common:saas-landing.news_readmore')}
        </Button>
      </div>
    </div>
  );
}

News.propTypes = {
  text: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default News;
