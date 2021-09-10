import { Button } from '@material-ui/core';
import { useEffect, useState } from 'react';

import { ActiveInput } from '../Utils';
import styles from './index.module.scss';

const Input = (props) => {
  const {
    item,
    formItems, setFormItems,
    removeValue, disabledTotal,
    setDisabledTotal,
  } = props;
  const [activeInput, setActiveInput] = useState(true);

  useEffect(() => {
    const elementsIndex = formItems.findIndex((element) => element.id === item.id);
    const newArray = [...formItems];
    newArray[elementsIndex] = {
      ...newArray[elementsIndex],
      active: activeInput,
    };
    setFormItems(newArray);
  }, [activeInput]);

  const setValue = async (event, type) => {
    const { value, id } = event.target;

    const elementsIndex = formItems.findIndex((element) => element.id === id);
    const newArray = [...formItems];
    if (type !== 'sideLabel') {
      newArray[elementsIndex] = {
        ...newArray[elementsIndex],
        label: value,
        formikKey: value.replace(/[`~!@#$%^&*()+=|}[{'";:?.>,<\\|\]/]+|_/g, ''),
      };
    } else {
      newArray[elementsIndex] = {
        ...newArray[elementsIndex],
        sideLabel: value.replace(/[,]+|_/g, ''),
      };
    }

    setFormItems(newArray);
  };

  return (
    <div className={styles.element}>
      {item.fieldType === 'input' && (
        <div key={item.id}>
          <h3>Text Input Element</h3>
          <input className={styles.input} type="text" value={item.label || ''} id={item.id} onChange={setValue} placeholder="Untitled Question" />
          <Button variant="contained" className={styles.remove} onClick={() => removeValue(item.id)}>Remove Question</Button>
          {/* Active/Disabled component, remove false when needed again
          Currently not in use. Left in to avoid removing other pieces for linting */}
          {false && (
            <ActiveInput
              activeInput={activeInput}
              setActiveInput={setActiveInput}
              disabledTotal={disabledTotal}
              setDisabledTotal={setDisabledTotal}
            />
          )}
        </div>
      )}
      {item.fieldType === 'numberInput' && (
        <div key={item.id}>
          <h3>Number Input Element</h3>
          <input className={styles.input} type="text" value={item.label || ''} id={item.id} onChange={setValue} placeholder="Untitled Question" />
          <Button role="button" variant="contained" className={styles.remove} onClick={() => removeValue(item.id)}>Remove Question</Button>
          {/* Active/Disabled component, remove false when needed again
          Currently not in use. Left in to avoid removing other pieces for linting */}
          {false && (
            <ActiveInput
              activeInput={activeInput}
              setActiveInput={setActiveInput}
              disabledTotal={disabledTotal}
              setDisabledTotal={setDisabledTotal}
            />
          )}
        </div>
      )}
      {item.fieldType === 'inputSideLabel' && (
        <div key={item.id}>
          <h3>Number Input Element</h3>
          <input className={styles.input} type="text" value={item.label || ''} id={item.id} onChange={setValue} placeholder="Untitled Question" />
          <input className={styles.input} type="text" value={item.sideLabel || ''} id={item.id} onChange={(e) => setValue(e, 'sideLabel')} placeholder="Side Label" />
          <Button role="button" variant="contained" className={styles.remove} onClick={() => removeValue(item.id)}>Remove Question</Button>
          {/* Active/Disabled component, remove false when needed again
          Currently not in use. Left in to avoid removing other pieces for linting */}
          {false && (
            <ActiveInput
              activeInput={activeInput}
              setActiveInput={setActiveInput}
              disabledTotal={disabledTotal}
              setDisabledTotal={setDisabledTotal}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Input;
