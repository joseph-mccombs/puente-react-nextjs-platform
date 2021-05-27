import {
  Button, Chip, CircularProgress,
  Grid, Input, MenuItem, NoSsr,
  Select,
} from '@material-ui/core';
import useInput from 'app/modules/hooks';
import { retrieveUniqueListOfOrganizations } from 'app/modules/parse';
import { postObjectsToClass } from 'app/services/parse';
import { useEffect, useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
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

const formTypes = [
  'Assets',
  'Custom',
];

function FormCreator({ context }) {
  const [formName, setFormName] = useInput({ type: 'text', placeholder: 'Form Name' });
  const [formDescription, setFormDescription] = useInput({ type: 'text', placeholder: 'Form Description' });
  const [formItems, setFormItems] = useState([]);
  const [formTypeNames, setFormTypeNames] = useState([]);

  const [organizationNames, setOrganizationNames] = useState([]);
  const [organizations, setOrganizations] = useState([]);

  useEffect(() => {
    retrieveUniqueListOfOrganizations().then((results) => {
      setOrganizations(results);
    });

    const action = JSON.stringify({
      key: '/forms/form-creator',
      action: 'duplicate',
    });

    if (context.store.has(action)) {
      // Run duplicate logic
      const form = context.store.get(action);
      const {
        typeOfForm, fields, organizations: orgs,
      } = form;

      setFormTypeNames(typeOfForm || []);
      setOrganizationNames(orgs || []);
      setFormItems(fields);
    }
  }, []);

  const handleOrganizationChange = (event) => {
    setOrganizationNames(event.target.value);
  };

  const handleFormTypesChange = (event) => {
    setFormTypeNames(event.target.value);
  };

  const submitCustomForm = () => {
    const formObject = {};
    formObject.fields = formItems;
    formObject.organizations = organizationNames;
    formObject.typeOfForm = formTypeNames;
    formObject.name = formName;
    formObject.class = '';
    formObject.description = formDescription;
    formObject.customForm = true;

    const postParams = {
      parseClass: 'FormSpecificationsV2',
      localObject: formObject,
    };
    postObjectsToClass(postParams).then(() => {
      console.log(postParams); //eslint-disable-line
    }).catch((err) => {
      console.log(err); //eslint-disable-line
    });
  };

  const removeValue = (id) => {
    const elementsIndex = formItems.findIndex((element) => element.id === id);
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
      <NoSsr>
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
              <div id="organization">
                <h2>Organization(s)</h2>
                {organizations.length < 1
                  && <CircularProgress />}
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
                  {organizations.length > 1 && organizations.map((organization) => (
                    <MenuItem key={organization} value={organization}>
                      {organization}
                    </MenuItem>
                  ))}
                </Select>
              </div>
              <div id="formType">
                <h2>Type of Form</h2>
                <Select
                  labelId="mutiple-chip-organization"
                  id="mutiple-chip"
                  multiple
                  value={formTypeNames}
                  onChange={handleFormTypesChange}
                  input={<Input id="select-multiple-chip" />}
                  renderValue={(selected) => (
                    <div>
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </div>
                  )}
                >
                  {formTypes.map((formType) => (
                    <MenuItem key={formType} value={formType}>
                      {formType}
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
      </NoSsr>

    </div>
  );
}

export default FormCreator;
// https://github.com/atlassian/react-beautiful-dnd/issues/216
