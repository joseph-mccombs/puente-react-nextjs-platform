import {
  Grid,
} from '@material-ui/core';
import { useGlobalState } from 'app/store';
import React, { useEffect, useState } from 'react';

import retrieveCustomData from './_data';
import styles from './index.module.scss';
import Table from './Table';

const FormManager = () => {
  const [organization] = useState('Puente');

  const [tableData, setTableData] = useState([]);

  const { contextManagment } = useGlobalState();

  useEffect(() => {
    retrieveCustomData(organization).then((records) => {
      setTableData(records);
    });
  });

  const passDataToFormCreator = (data) => {
    contextManagment.addPropToStore('pageLevel', data); // contextManagement.removeFromGlobalStoreData(key);
  };

  return (
    <div className={styles.formCreator}>
      <Grid container>
        <h1>Form Manager</h1>
        <Table
          data={tableData}
          retrieveCustomData={retrieveCustomData}
          passDataToFormCreator={passDataToFormCreator}
          organization={organization}
        />
      </Grid>
    </div>
  );
};

export default FormManager;
