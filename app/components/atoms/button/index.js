import { Button as MaterialButton } from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export default function Button({
  variant,
  color,
  disabled,
  text,
}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <MaterialButton
        variant={variant || ''}
        color={color || ''}
        disabled={disabled || ''}
      >
        {text || ''}
      </MaterialButton>
    </div>
  );
}
