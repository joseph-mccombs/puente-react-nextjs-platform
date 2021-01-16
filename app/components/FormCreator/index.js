import React from "react";
import { v4 as uuid } from "uuid";
import { DragDropContext} from "react-beautiful-dnd";
import {reorder, copy} from './_utils'
import FormTemplate from './FormTemplate';
import FormBlocks from './FormBlocks';
import NoSSR from 'react-no-ssr';


import styles from './index.module.scss';

const COLLECTION = [
  { id: uuid(), label: "Apple" },
  { id: uuid(), label: "Banana" },
  { id: uuid(), label: "Orange" }
];

function App() {
  const [shoppingBagItems, setShoppingBagItems] = React.useState([]);
  const onDragEnd = React.useCallback(
    result => {
      const { source, destination } = result;

      if (!destination) {
        return;
      }

      switch (source.droppableId) {
        case destination.droppableId:
          setShoppingBagItems(state =>
            reorder(state, source.index, destination.index)
          );
          break;
        case "SHOP":
          setShoppingBagItems(state =>
            copy(COLLECTION, state, source, destination)
          );
          break;
        default:
          break;
      }
    },
    [setShoppingBagItems]
  );
  return (
    <div className={styles.formCreator}>
    <NoSSR>

      <DragDropContext onDragEnd={onDragEnd}>
        <h2>Shop</h2>
        <FormBlocks items={COLLECTION} />
        <h2>Shopping bag</h2>
        <FormTemplate items={shoppingBagItems} />
      </DragDropContext>
      </NoSSR>

    </div>
  );
}

export default App
