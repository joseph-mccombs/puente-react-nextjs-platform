import { Button } from '@material-ui/core';
import { useState } from 'react';
import { v4 as uuid } from 'uuid';

import styles from './index.module.scss';

const Loop = (props) => {
  const {
    item,
    formItems, setFormItems,
    removeValue,
  } = props;

  const [questionsToRepeat, setQuestionsToRepeat] = useState(null);

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

  const setQuestionsToRepeatValue = async (event) => {
    const { value, id } = event.target;
    
    console.log(Number(value))
    setQuestionsToRepeat(Number(value));
    if (Number(value) != NaN) {
        const elementsIndex = formItems.findIndex((element) => element.id === id);
        console.log(elementsIndex)
        const newArray = [...formItems];
        newArray[elementsIndex] = {
        ...newArray[elementsIndex],
        numberQuestionsToRepeat: value,
        };
        console.log(newArray)

        setFormItems(newArray);
    }
  };

  return (
    <div className={styles.element}>
      {item.fieldType === 'loop' && (
        <div key={item.id}>
          <h3>Loop Element</h3>
          <input className={styles.input} type="text" value={item.label || ''} id={item.id} onChange={setValue} placeholder="Untitled Loop" />
          <h4>Number of Previous Questions to Repeat in Loop</h4>
          <input className={styles.input} type="text" value={item.numberQuestionsToRepeat || ''} id={item.id} onChange={setQuestionsToRepeatValue} placeholder="eg. 3" />
          <Button variant="contained" className={styles.remove} onClick={() => removeValue(item.id)}>Remove Question</Button>
          {questionsToRepeat === NaN && (
            <h5>
              Number of Previous Questions to repeat must be a number!
            </h5>
          )}
        </div>
      )}
    </div>
  );
};

export default Loop;
