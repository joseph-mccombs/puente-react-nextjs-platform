import * as MaterialButton from '@material-ui/core/Button';
import React from 'react';

const Button = (props) => {
  const {
    variant,
    color,
    disabled,
    text,
    ...rest
  } = props;

  return (
    <div>
      <MaterialButton
        {...rest}
        variant={variant || ''}
        color={color || ''}
        disabled={disabled || ''}
      >
        {text || ''}
      </MaterialButton>
    </div>
  );
};

export default Button;
