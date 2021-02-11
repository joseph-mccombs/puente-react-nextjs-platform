const Select = (props) => {
  const {
    item, setFormValue, removeValue,
  } = props;

  const {
    label, fieldType, id,
  } = item;

  return (
    <div>
      {fieldType === 'select' && (
        <div key={item.id}>
          <h1>Select</h1>
          <input type="text" value={label || ''} id={id} onChange={setFormValue} />
          <div onClick={() => removeValue(id)}>Remove</div>
        </div>
      )}
    </div>
  );
};

export default Select;
