import { Button } from '@material-ui/core';
import React from 'react';
import { v4 as uuid } from 'uuid';

import styles from './index.module.scss';

const Select = (props) => {
  const {
    item, formItems, setFormItems, removeValue,
  } = props;

  const [options, setOptions] = React.useState([{ id: uuid(), label: '', value: '' }]);

  const setValue = async (event) => {
    const { value, id } = event.target;

    const elementsIndex = formItems.findIndex((element) => element.id === id);
    const newArray = [...formItems];
    newArray[elementsIndex] = {
      ...newArray[elementsIndex],
      label: value,
      formikKey: value.replace(/[`~!@#$%^&*()+=|}[{'";:?.>,<\\|\]/]+|_/g, ''),
      options,
    };
    setFormItems(newArray);
  };

  const addOption = () => {
    setOptions([...options, { id: uuid(), label: '', value: '' }]);
  };

  const editOption = async (event, questionId) => {
    const { value, id } = event.target;

    const elementsIndex = options.findIndex((element) => element.id === id);

    const newArray = [...options];
    newArray[elementsIndex] = {
      ...newArray[elementsIndex],
      label: value,
      value,
    };

    setOptions(newArray);

    const elementsFormIndex = formItems.findIndex((element) => element.id === questionId);

    const formArray = [...formItems];

    formArray[elementsFormIndex] = {
      ...formArray[elementsFormIndex],
      options: newArray,
    };

    setFormItems(formArray);
  };
  const removeOption = (id) => {
    const elementsIndex = options.findIndex((element) => element.id === id);
    const newArray = [...options];
    newArray.splice(elementsIndex, 1);
    setOptions(newArray);
  };

  return (
    <div style={{ padding: 20 }}>
      {item?.fieldType === 'select' && (
        <div key={item.id}>
          <h3>Multiple Choice Element</h3>
          <input className={styles.input} type="text" value={item.label || ''} id={item.id} onChange={setValue} placeholder="Untitled Question" />
          <div>
            {options.map((option, index) => (
              <div>
                <h3>
                  {`Option ${index + 1}`}
                </h3>
                <input type="text" value={option.value} id={option.id} onChange={(e) => editOption(e, item.id)} />
                <Button style={{ color: 'green' }} onClick={addOption}>Add option</Button>
                <Button onClick={() => removeOption(option.id)}>Remove</Button>
              </div>
            ))}
          </div>
          <Button variant="contained" className={styles.remove} onClick={() => removeValue(item.id)}>Remove Question</Button>
        </div>
      )}
    </div>
  );
};

export default Select;
