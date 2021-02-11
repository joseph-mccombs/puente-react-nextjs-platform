import React from 'react';
import { v4 as uuid } from 'uuid';

const Select = (props) => {
  const {
    item, formItems, setFormItems, removeValue,
  } = props;
  const {
    label, text, fieldType, id,
  } = item;

  const [options, setOptions] = React.useState([{ id: uuid(), label: '', value: '' }]);

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
      value: value.replace(/[^\w\s]|_/g, ''),
    };
    console.log(newArray);

    setOptions(newArray);
  };
  const removeOption = (id) => {
    const elementsIndex = options.findIndex((element) => element.id == id);
    const newArray = [...options];
    newArray.splice(elementsIndex, 1);
    console.log(newArray);
    setOptions(newArray);
  };

  return (
    <div>
      {fieldType === 'select' && (
        <div key={item.id}>
          <h1>Select</h1>
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
