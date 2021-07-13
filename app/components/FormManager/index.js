import {
  Button,
  Grid,
  Modal
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AppsIcon from '@material-ui/icons/Apps';
import { retrieveCustomData } from 'app/modules/parse';
import React, { useEffect, useState } from 'react';
import { isArray } from 'underscore';

import styles from './index.module.scss';
import Table from './Table';
import GridTable from './Grid';

const FormManager = ({ context, router }) => {
  const [organization] = useState('Test');

  const [workflowData, setWorkflowData] = useState({})
  const [puenteData, setPuenteData] = useState([])
  const [noWorkflowData, setNoWorkflowData] = useState([])
  const [workflowModal, setWorkflowModal] = useState(false);
  const [listView, setListView] = useState(true);
  

  useEffect(() => {
    retrieveCustomData(organization).then((records) => {
      const tableDataByCategory = {};
      records.forEach((record) => {
        if (!isArray(record.workflows) || record.workflows.length < 1) {
          if ('No Workflow Assigned' in tableDataByCategory) {
            tableDataByCategory['No Workflow Assigned'] = tableDataByCategory['No Workflow Assigned'].concat([record]);
          }
          else {
            tableDataByCategory['No Workflow Assigned'] = [record]
          }
        }
        else if (isArray(record.workflows)) {
          record.workflows.forEach((workflow) => {
            if (workflow in tableDataByCategory) {
              console.log(tableDataByCategory[workflow])
              tableDataByCategory[workflow] = tableDataByCategory[workflow].concat([record])
            }
            else {
              tableDataByCategory[workflow] = [record]
            }
          })
        }
      })
      setPuenteData(tableDataByCategory['Puente']);
      setNoWorkflowData(tableDataByCategory['No Workflow Assigned']);
      delete tableDataByCategory['Puente'];
      delete tableDataByCategory['No Workflow Assigned'];
      setWorkflowData(tableDataByCategory)
    });
  }, []);

  const passDataToFormCreator = (data) => {
    const href = '/forms/form-creator';

    const action = JSON.stringify({
      key: href,
      action: 'duplicate',
    });
    context.addPropToStore(action, data); // contextManagement.removeFromGlobalStoreData(key);
    router.push(href);
  };

  const openWorkflowModal = () => {
    setWorkflowModal(true);
  }

  const closeWorkflowModal = () => {
    setWorkflowModal(false);
  }

  return (
    <div className={styles.formCreator}>
      <Grid container>
        <h2>Puente Forms</h2>
        {listView === true ? (
          <div>
            <IconButton 
              onClick={() => setListView(true)}
              style={{backgroundColor: 'lightBlue', color: 'blue', marginTop: 'auto', marginBottom: 'auto'}}
            >
              <MenuIcon/>
            </IconButton>
            <IconButton 
              onClick={() => setListView(false)}
              style={{ color: 'grey'}}
            >
              <AppsIcon/>
            </IconButton>
          </div>
        ) : (
          <div>
            <IconButton 
              onClick={() => setListView(true)}
              style={{ color: 'grey'}}
            >
              <MenuIcon/>
            </IconButton>
            <IconButton 
              onClick={() => setListView(false)}
              style={{backgroundColor: 'lightBlue', color: 'blue'}}
            >
              <AppsIcon/>
            </IconButton>
          </div>
        )}
        {listView === true ? (
          <Table
            data={puenteData}
            retrieveCustomData={retrieveCustomData}
            passDataToFormCreator={passDataToFormCreator}
            organization={organization}
          />
        ) : (
          <GridTable
            data={puenteData}
          />
        )}
      </Grid>
      <GridTable
            data={puenteData}
          />
      <h2>Custom Forms</h2>
      <Button aria-label="add workflow" onClick={openWorkflowModal}>Add Workflow</Button>
      {/* {workflowModal && ( */}
        <Modal
          open={workflowModal}
          onClose={closeWorkflowModal}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <div style={styles.modalContainer}>
            <h2 id="simple-modal-title">Hi</h2>
            <p id="simple-modal-description">you</p>
          </div>
        </Modal>
      {/* )} */}
      {
        Object.keys(workflowData).map((key, index) => ( 
          <Grid container>
            <h3>{key}</h3>
            <Table
            data={workflowData[key]}
            retrieveCustomData={retrieveCustomData}
            passDataToFormCreator={passDataToFormCreator}
            organization={organization}
            />
          </Grid>
        ))
      }
      <Grid container>
        <h3>No Workflow Assigned</h3>
        <Table
          data={noWorkflowData}
          retrieveCustomData={retrieveCustomData}
          passDataToFormCreator={passDataToFormCreator}
          organization={organization}
        />
      </Grid>
    </div>
  );
};

export default FormManager;
