import { Grid } from '@material-ui/core';
import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import NoSSR from 'react-no-ssr';
import { v4 as uuid } from 'uuid';

import { copy, reorder } from './_utils';
import FormBlocks from './FormBlocks';
import FormTemplate from './FormTemplate';

const COLLECTION = [
  // { id: uuid(), text: 'Section title', fieldType: 'header' },
  { id: uuid(), text: 'Input - Number', fieldType: 'numberInput' },
  { id: uuid(), text: 'Input - Text', fieldType: 'input' },
  // { id: uuid(), text: 'Input - Multiple in a Row', fieldType: 'multiInputRow' },
  // { id: uuid(), text: 'Input - Number - Multiple in a Row', fieldType: 'multiInputRowNum' },
  { id: uuid(), text: 'Select - Single Choice', fieldType: 'select' },
  // { id: uuid(), text: 'Select - Multiple Choice', fieldType: 'selectMulti' },
  // { id: uuid(), text: 'Geolocation', fieldType: 'geolocation' },
];

function FormCreator() {
  const [formItems, setFormItems] = React.useState([]);

  const removeValue = (id) => {
    const elementsIndex = formItems.findIndex((element) => element.id == id);
    const newArray = [...formItems];
    newArray.splice(elementsIndex, 1);
    console.log(newArray);
    setFormItems(newArray);
  };
  const onDragEnd = React.useCallback(
    (result) => {
      const { source, destination } = result;

      if (!destination) {
        return;
      }

      switch (source.droppableId) {
        case destination.droppableId:
          setFormItems((state) => reorder(state, source.index, destination.index));
          break;
        case 'BLOCK':
          setFormItems((state) => copy(COLLECTION, state, source, destination));
          break;
        default:
          break;
      }
    },
    [setFormItems],
  );
  return (
  // <div className={styles.formCreator}>
    <NoSSR>
      <DragDropContext onDragEnd={onDragEnd}>
        <Grid container>
          <Grid item xs={9}>
            <h2>Form Creator</h2>
            <FormTemplate
              formItems={formItems}
              setFormItems={setFormItems}
              removeValue={removeValue}
            />
          </Grid>
          <Grid item xs={3}>
            <h2>Building Blocks</h2>
            <FormBlocks items={COLLECTION} />
          </Grid>
        </Grid>
      </DragDropContext>
    </NoSSR>

  // </div>
  );
}

export default FormCreator;

// https://github.com/atlassian/react-beautiful-dnd/issues/216
