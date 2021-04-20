import {
  Grid,
} from '@material-ui/core';
import { customQueryService } from 'app/services/parse';
import React, { useEffect, useState } from 'react';

import styles from './index.module.scss';
import Table from './Table';

const retrieveCustomData = async (organization) => {
  try {
    const records = await customQueryService(0, 5000, 'FormSpecificationsV2', 'organizations', organization);
    const parsedRecords = JSON.parse(JSON.stringify(records));
    return parsedRecords;
  } catch (e) {
    return e;
  }
};

const FormManager = () => {
  const [organization] = useState('Puente');

  const [tableData, setTableData] = useState([]);
  useEffect(() => {
    retrieveCustomData(organization).then((records) => {
      setTableData(records);
    });
  });

  return (
    <div className={styles.formCreator}>
      <Grid container>
        <h1>Form Manager</h1>
        <Table
          data={tableData}
          retrieveCustomData={retrieveCustomData}
          organization={organization}
        />
      </Grid>
    </div>
  );
};

export default FormManager;
