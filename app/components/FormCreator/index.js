import { Grid } from '@material-ui/core';
import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import NoSSR from 'react-no-ssr';
import { v4 as uuid } from 'uuid';

import { copy, reorder } from './_utils';
import FormBlocks from './FormBlocks';
import FormTemplate from './FormTemplate';
import styles from './index.module.scss';

const COLLECTION = [
  { id: uuid(), label: 'Section title' },
  { id: uuid(), label: 'Horizontal divider' },
  { id: uuid(), label: 'Input' },
  { id: uuid(), label: 'Single Choice' },
  { id: uuid(), label: 'Multiple Choice' },
];

function FormCreator() {
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
      <NoSSR>

        <DragDropContext onDragEnd={onDragEnd}>
          <Grid container>
            <Grid item xs={6}>

              <h2>Form Creator</h2>
              <FormTemplate items={shoppingBagItems} />
            </Grid>
            <Grid item xs={6}>

              <h2>Building Blocks</h2>
              <FormBlocks items={COLLECTION} />
            </Grid>

          </Grid>
        </DragDropContext>
      </NoSSR>

    </div>
  );
}

export default FormCreator;
