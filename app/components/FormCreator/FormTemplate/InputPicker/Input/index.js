const Input = (props) => {
  const {
    item,
    formItems, setFormItems,
    removeValue,
  } = props;
  const {
    label, text, fieldType, id,
  } = item;

  const setValue = async (event) => {
    const { value, id } = event.target;

    const elementsIndex = formItems.findIndex((element) => element.id == id);
    const newArray = [...formItems];
    newArray[elementsIndex] = {
      ...newArray[elementsIndex],
      label: value,
      formikKey: value.replace(/[^\w\s]|_/g, ''),
    };
    console.log(newArray);

    setFormItems(newArray);
  };

  return (
    <div>
      {fieldType === 'input' && (
        <div key={item.id}>
          <h1>Text Input</h1>
          <input type="text" value={label || ''} id={id} onChange={setValue} />
          <div onClick={() => removeValue(id)}>Remove</div>
        </div>
      )}
      {fieldType === 'numberInput' && (
        <div key={item.id}>
          <h1>Number Input</h1>
          <input type="text" value={label || ''} id={id} onChange={setValue} />
          <div onClick={() => removeValue(id)}>Remove</div>
        </div>
      )}
    </div>
  );
};

export default Input;
