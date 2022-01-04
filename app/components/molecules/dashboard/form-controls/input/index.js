import TextField from '@material-ui/core/TextField';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import styles from './index.module.scss';
// import "./index.scss";

function FormInput(props) {
  const { control } = useFormContext();
  const {
    name, label, required, errorobj,
  } = props;
  let isError = false;
  let errorMessage = '';
  if (errorobj && errorobj.hasOwnProperty(name)) {
    isError = true;
    errorMessage = errorobj[name].message;
  }

  return (
    <Controller
      as={TextField}
      name={name}
      control={control}
      defaultValue=""
      label={label}
      fullWidth
      InputLabelProps={{
        className: required ? 'required-label' : '',
        required: required || false,
      }}
      error={isError}
      helperText={errorMessage}
      {...props}
    />
  );
}

export default FormInput;
