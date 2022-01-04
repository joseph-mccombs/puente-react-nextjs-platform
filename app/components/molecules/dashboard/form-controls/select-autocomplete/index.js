import FormHelperText from '@material-ui/core/FormHelperText';
import React, { useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import Select, { createFilter } from 'react-select';

import { StyledAutoSelectInputLabel, StyledFormControl } from '../_styles';
import styles from './index.module.scss';

const stylesReactSelect = {
  clearIndicator: (provided, state) => ({
    ...provided,
    cursor: 'pointer',
  }),
  indicatorSeparator: (provided, state) => ({
    ...provided,
    margin: 0,
  }),
  dropdownIndicator: (provided, state) => ({
    ...provided,
    cursor: 'pointer',
  }),
  placeholder: (provided, state) => ({
    ...provided,
    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
    color: state.selectProps.error ? '#f44336' : 'rgba(0, 0, 0, 0.54)',
  }),
  control: (provided, state) => ({
    ...provided,
    borderRadius: 0,
    border: 0,
    borderBottom: state.selectProps.error
      ? '1px solid #f44336'
      : '1px solid rgba(0,0,0,0.87)',
    boxShadow: 'none',
    ':hover': {
      borderColor: state.selectProps.error ? '1px solid #f44336' : 'inherit',
      boxShadow: state.selectProps.error ? '1px solid #f44336' : 'none',
    },
  }),
  valueContainer: (provided, state) => ({
    ...provided,
    paddingLeft: 0,
  }),
};

const components = {
  Option,
};

function Option(props) {
  const { onMouseMove, onMouseOver, ...newInnerProps } = props.innerProps;
  return (
    <div {...newInnerProps} className="autoselect-options">
      {props.children}
    </div>
  );
}

const ReactSelect = (props) => {
  const {
    label, options, required, errorobj, name,
  } = props;
  let isError = false;
  let errorMessage = '';
  if (errorobj && errorobj.hasOwnProperty(name)) {
    isError = true;
    errorMessage = errorobj[name].message;
  }
  return (
    <>
      <StyledFormControl>
        <StyledAutoSelectInputLabel>
          <span className={isError ? 'req-label' : ''}>
            {label}
            {' '}
            {required ? <span className="req-label">*</span> : null}
          </span>
        </StyledAutoSelectInputLabel>
        <Select
          options={options}
          placeholder="Please Select"
          valueKey="id"
          components={components}
          isClearable
          styles={stylesReactSelect}
          isSearchable
          filterOption={createFilter({ ignoreAccents: false })}
          error={isError}
          {...props}
        />
        {isError && (
          <FormHelperText error={isError}>{errorMessage}</FormHelperText>
        )}
      </StyledFormControl>
    </>
  );
};

function FormSelectAutoComplete(props) {
  const { control } = useFormContext();
  const { name, label, options } = props;

  const [newData, setNewData] = useState([]);

  useEffect(() => {
    const newOptions = options.map((data, index) => ({
      label: data.label,
      value: data.id,
    }));
    setNewData(newOptions);
  }, [options]);

  return (
    <>
      <Controller
        as={ReactSelect}
        name={name}
        control={control}
        label={label}
        defaultValue={[]}
        {...props}
        options={newData}
      />
    </>
  );
}

export default FormSelectAutoComplete;
