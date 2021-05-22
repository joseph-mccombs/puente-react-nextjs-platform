import { Button } from '@material-ui/core';

import styles from './index.module.scss';

const Header = (props) => {
  const {
    item,
    formItems, setFormItems,
    removeValue,
  } = props;

  const setValue = async (event) => {
    const { value, id } = event.target;

    const elementsIndex = formItems.findIndex((element) => element.id === id);
    const newArray = [...formItems];
    newArray[elementsIndex] = {
      ...newArray[elementsIndex],
      label: value,
      formikKey: value.replace(/[`~!@#$%^&*()+=|}[{'";:?.>,<\\|\]/]+|_/g, ''),
    };

    setFormItems(newArray);
  };

  return (
    <div className={styles.element}>
      {item.fieldType === 'header' && (
        <div key={item.id}>
          <h3>Header</h3>
          <input className={styles.input} type="text" value={item.label || ''} id={item.id} onChange={setValue} placeholder="Untitled Header" />
          <Button variant="contained" className={styles.remove} onClick={() => removeValue(item.id)}>Remove Header</Button>
        </div>
      )}
    </div>
  );
};

export default Header;
