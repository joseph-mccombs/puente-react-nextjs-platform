import { Button } from '@material-ui/core';
import { useEffect } from 'react';

import styles from './index.module.scss';

const Input = (props) => {
  const {
    item,
    formItems, setFormItems,
    removeValue,
  } = props;

  useEffect(() => {

    const elementsIndex = formItems.findIndex((element) => element.id === item.id);
    const newArray = [...formItems];
    newArray[elementsIndex] = {
      ...newArray[elementsIndex],
      formikKey: 'location_'+item.id,
    };

    setFormItems(newArray);
  }, [])

  return (
    <div className={styles.element}>
      {item.fieldType === 'geolocation' && (
        <div key={item.id}>
          <h3>Geolocation</h3>
          <Button variant="contained" className={styles.remove} onClick={() => removeValue(item.id)}>Remove Question</Button>
        </div>
      )}
    </div>
  );
};

export default Input;
