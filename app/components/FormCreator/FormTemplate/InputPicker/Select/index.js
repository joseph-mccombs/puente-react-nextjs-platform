import React from 'react';
import { v4 as uuid } from 'uuid';

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
  const editOption = async (event) => {
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
  };
  const removeOption = (id) => {
    const elementsIndex = options.findIndex((element) => element.id == id);
    const newArray = [...options];
    newArray.splice(elementsIndex, 1);
    // console.log(newArray);
    setOptions(newArray);
  };

  return (
    <div>
      {fieldType === 'select' && (
        <div key={id}>
          <h1>Select</h1>
          <input type="text" value={label || ''} id={id} onChange={setValue} />
          {options.map((item, index) => (
            <div>
              <input type="text" value={item.value} id={item.id} onChange={editOption} />
              <div onClick={() => removeOption(item.id)}>Remove</div>
            </div>
          ))}
          <div onClick={addOption}>Add option</div>
          <div onClick={() => removeValue(id)}>Remove</div>
        </div>
      )}
    </div>
  );
};

export default Select;
