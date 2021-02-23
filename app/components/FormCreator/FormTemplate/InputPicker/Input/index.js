import { Button } from '@material-ui/core';

import styles from './index.module.scss';

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
    <div className={styles.element}>
      {fieldType === 'input' && (
        <div key={item.id}>
          <h3>Text Input Element</h3>
          <input className={styles.input} type="text" value={label || ''} id={id} onChange={setValue} placeholder="Untitled Question" />
          <div onClick={() => removeValue(id)}>Remove</div>
          <Button variant="contained" className={styles.remove} onClick={() => removeValue(id)}>Remove Question</Button>

        </div>
      )}
      {fieldType === 'numberInput' && (
        <div key={item.id}>
          <h3>Number Input Element</h3>
          <input className={styles.input} type="text" value={label || ''} id={id} onChange={setValue} placeholder="Untitled Question" />
          <Button variant="contained" className={styles.remove} onClick={() => removeValue(id)}>Remove Question</Button>
        </div>
      )}
    </div>
  );
};

export default Input;
