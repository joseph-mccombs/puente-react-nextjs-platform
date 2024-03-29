import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';

import useStyles from './title-style';

export default function Title(props) {
  const classes = useStyles();
  const { children, align } = props;
  const setAlign = (alignment) => {
    switch (alignment) {
      case 'left':
        return classes.left;
      case 'right':
        return classes.right;
      case 'center':
        return classes.center;
      default:
        return classes.left;
    }
  };
  return (
    <div className={clsx(classes.title, setAlign(align))}>
      <Typography variant="h3">
        {children}
      </Typography>
    </div>
  );
}

Title.propTypes = {
  children: PropTypes.node.isRequired,
  align: PropTypes.string,
};

Title.defaultProps = {
  align: 'left',
};
