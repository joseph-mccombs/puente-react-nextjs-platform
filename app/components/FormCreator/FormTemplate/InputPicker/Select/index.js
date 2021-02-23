import { Button } from '@material-ui/core';
import React from 'react';
import { v4 as uuid } from 'uuid';

import styles from './index.module.scss';

// Use this funciton right beforea push to Parse-Server
function camelize(str) {
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => (index === 0 ? word.toLowerCase() : word.toUpperCase())).replace(/\s+/g, '');
}

const Select = (props) => {
  const {
    item, formItems, setFormItems, removeValue,
  } = props;
  const {
    label, text, fieldType, id,
  } = item;

  const [options, setOptions] = React.useState([{ id: uuid(), label: '', value: '' }]);

  const setValue = async (event) => {
    const { value, id } = event.target;

    const elementsIndex = formItems.findIndex((element) => element.id == id);
    const newArray = [...formItems];
    newArray[elementsIndex] = {
      ...newArray[elementsIndex],
      label: value,
      formikKey: value,
      options,
    };
    console.log(newArray);

    setFormItems(newArray);
  };

  const addOption = () => {
    setOptions((options) => [...options, { id: uuid(), label: '', value: '' }]);
  };
  const editOption = async (event, questionId) => {
    const { value, id } = event.target;

    const elementsIndex = options.findIndex((element) => element.id == id);

    const newArray = [...options];
    newArray[elementsIndex] = {
      ...newArray[elementsIndex],
      label: value,
      value,
    };
    // console.log(newArray);

    setOptions(newArray);
    const elementsFormIndex = formItems.findIndex((element) => element.id == questionId);
    const formArray = [...formItems];
    formArray[elementsFormIndex] = {
      ...formArray[elementsFormIndex],
      options: newArray,
    };

    setFormItems(formArray);
    console.log(formArray);
  };
  const removeOption = (id) => {
    const elementsIndex = options.findIndex((element) => element.id == id);
    const newArray = [...options];
    newArray.splice(elementsIndex, 1);
    // console.log(newArray);
    setOptions(newArray);
  };

  return (
    <div style={{ padding: 20 }}>
      {fieldType === 'select' && (
        <div key={id}>
          <h3>Multiple Choice Element</h3>
          <input className={styles.input} type="text" value={label || ''} id={id} onChange={setValue} placeholder="Untitled Question" />
          <div>
            {options.map((item, index) => (
              <div>
                <h3>
                  {`Option ${index + 1}`}
                </h3>
                <input type="text" value={item.value} id={item.id} onChange={(e) => editOption(e, id)} />
                <Button style={{ color: 'green' }} onClick={addOption}>Add option</Button>
                <Button onClick={() => removeOption(item.id)}>Remove</Button>
              </div>
            ))}
          </div>
          <Button variant="contained" className={styles.remove} onClick={() => removeValue(id)}>Remove Question</Button>
        </div>
      )}
    </div>
  );
};

export default Select;
