import { Draggable, Droppable } from 'react-beautiful-dnd';

import styles from './index.module.scss';
import InputPicker from './InputPicker';

const FormTemplate = (props) => {
  const { formItems, setFormItems, removeValue } = props;
  return (
    <Droppable droppableId="DROP-AREA" className={styles.formTemplate}>
      {(provided, snapshot) => (
        <div ref={provided.innerRef} className={styles['drop-area']}>
          {formItems.map((item, index) => (
            <Draggable key={item.id} draggableId={item.id} index={index}>
              {(provided, snapshot) => (
                <InputPicker
                  item={item}
                  formItems={formItems}
                  setFormItems={setFormItems}
                  removeValue={removeValue}
                  provided={provided}
                  innerRef={provided.innerRef}
                />
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default FormTemplate;
