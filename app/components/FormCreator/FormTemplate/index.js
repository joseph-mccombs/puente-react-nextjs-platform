import { Draggable, Droppable } from 'react-beautiful-dnd';

import styles from './index.module.scss';
import InputPicker from './InputPicker';

const FormTemplate = (props) => {
  const { items, setValue, removeValue } = props;
  return (
    <Droppable droppableId="DROP-AREA" className={styles.formTemplate}>
      {(provided, snapshot) => (
        <div ref={provided.innerRef} className={styles['drop-area']}>
          {items.map((item, index) => (
            <Draggable key={item.id} draggableId={item.id} index={index}>
              {(provided, snapshot) => (
                // <div
                // ref={provided.innerRef}
                // {...provided.draggableProps}
                // {...provided.dragHandleProps}
                // style={provided.draggableProps.style}
                // onClick={() => props.setValue(item.id)}
                // >
                //   {item.text}
                // </div>
                <InputPicker
                  item={item}
                  setFormValue={setValue}
                  removeValue={removeValue}
                  provided={provided}
                  innerRef={provided.innerRef}
                  // onClick={() => props.setValue(item.id)}
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
