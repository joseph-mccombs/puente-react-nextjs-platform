import { Draggable, Droppable } from 'react-beautiful-dnd';

import styles from './index.module.scss';

export default function FormTemplate(props) {
  return (
    <Droppable droppableId="DROP-AREA" className={styles.formTemplate}>
      {(provided, snapshot) => (
        <div ref={provided.innerRef} className={styles['drop-area']}>
          {props.items.map((item, index) => (
            <Draggable key={item.id} draggableId={item.id} index={index}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  style={provided.draggableProps.style}
                  onClick={() => props.setValue(item.id)}
                >
                  {item.label}
                  {/* <input></input> */}
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}
