import { Draggable, Droppable } from 'react-beautiful-dnd';

import styles from './index.module.scss';

export default function FormTemplate(props) {
  return (
    <Droppable droppableId="BAG" className={styles.formTemplate}>
      {(provided, snapshot) => (
        <ul ref={provided.innerRef} className={styles['drop-area']}>
          {props.items.map((item, index) => (
            <Draggable key={item.id} draggableId={item.id} index={index}>
              {(provided, snapshot) => (
                <li
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  style={provided.draggableProps.style}
                >
                  {item.label}
                </li>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </ul>
      )}
    </Droppable>
  );
}
