import { DragDropContext } from 'react-beautiful-dnd';
import { v4 as uuid } from 'uuid';

import { copy, reorder } from './_utils';
import FormBlocks from './FormBlocks';
import FormCanvas from './FormCanvas';
import styles from './index.module.scss';

const COLLECTION = [
  { id: uuid(), label: 'Apple' },
  { id: uuid(), label: 'Banana' },
  { id: uuid(), label: 'Orange' },
];

const FormCreator = () => {
  const [shoppingBagItems, setShoppingBagItems] = React.useState([]);
  const onDragEnd = React.useCallback(
    (result) => {
      const { source, destination } = result;

      if (!destination) {
        return;
      }

      switch (source.droppableId) {
        case destination.droppableId:
          setShoppingBagItems((state) => reorder(state, source.index, destination.index));
          break;
        case 'SHOP':
          setShoppingBagItems((state) => copy(COLLECTION, state, source, destination));
          break;
        default:
          break;
      }
    },
    [setShoppingBagItems],
  );
  return (
    <div className={styles.formCreator}>

      <DragDropContext onDragEnd={onDragEnd}>
        <h2>Shop</h2>
        <FormCanvas items={COLLECTION} />
        <h2>Shopping bag</h2>
        <FormBlocks items={shoppingBagItems} />
      </DragDropContext>
    </div>
  );
};

export default FormCreator;
