import {
  Button, Chip, Grid, Input, MenuItem, Select,
} from '@material-ui/core';
import useInput from 'app/modules/hooks';
import { postObjectsToClass } from 'app/services/parse';
import React, { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import NoSSR from 'react-no-ssr';
import { v4 as uuid } from 'uuid';

import { copy, reorder } from './_utils';
import FormBlocks from './FormBlocks';
import FormTemplate from './FormTemplate';
import styles from './index.module.scss';

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

const organizations = [
  'Puente',
  'WOF',
  'One World Surgery',
  'Mayanza',
  'Ayuda',
  'testORG',
  'Ryans Well'
];

function FormCreator() {
  const [formName, setFormName] = useInput({ type: 'text', placeholder: 'Form Name' });
  const [formDescription, setFormDescription] = useInput({ type: 'text', placeholder: 'Form Description' });
  const [organizationNames, setOrganizationNames] = React.useState([]);

  const handleOrganizationChange = (event) => {
    setOrganizationNames(event.target.value);
  };

  const [formItems, setFormItems] = useState([]);

  const submitCustomForm = () => {
    const formObject = {};
    formObject.fields = formItems;
    formObject.organizations = organizationNames;
    formObject.name = formName;
    formObject.class = '';
    formObject.description = formDescription;
    formObject.customForm = true;

    const postParams = {
      parseClass: 'FormSpecificationsV2',
      localObject: formObject,
    };
    postObjectsToClass(postParams).then(() => {
      console.log(formItems);
    }).catch((err) => {
      console.log(err);
    });
  };

  const removeValue = (id) => {
    const elementsIndex = formItems.findIndex((element) => element.id == id);
    const newArray = [...formItems];
    newArray.splice(elementsIndex, 1);
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
    <div className={styles.formCreator}>
      <NoSSR>
        <DragDropContext onDragEnd={onDragEnd}>
          <Grid container>
            <Grid item xs={9}>
              <div className={styles.formButtons}>
                <h2>Form Creator</h2>
                <Button variant="outlined" color="primary" onClick={() => setFormItems([])}>
                  Reset Form
                </Button>
                <Button variant="contained" color="primary" onClick={submitCustomForm}>
                  Submit
                </Button>
              </div>
              <div>
                <Select
                  labelId="mutiple-chip-organization"
                  id="mutiple-chip"
                  multiple
                  value={organizationNames}
                  onChange={handleOrganizationChange}
                  input={<Input id="select-multiple-chip" />}
                  renderValue={(selected) => (
                    <div>
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </div>
                  )}
                >
                  {organizations.map((organization) => (
                    <MenuItem key={organization} value={organization}>
                      {organization}
                    </MenuItem>
                  ))}
                </Select>
              </div>
              <div>
                {setFormName}
              </div>
              <div>
                {setFormDescription}
              </div>
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

    </div>
  );
}

export default FormCreator;

// https://github.com/atlassian/react-beautiful-dnd/issues/216
