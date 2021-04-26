import {
  Grid,
} from '@material-ui/core';
import { customQueryService } from 'app/services/parse';
import React, { useEffect, useState } from 'react';

import retrieveCustomData from './_data';
import styles from './index.module.scss';
import Table from './Table';

const FormManager = () => {
  const [organization] = useState('Puente');

  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    retrieveCustomData(organization).then((records) => {
      setTableData(records);
    });
  });

  const passDataToFormCreator = (data) => {
    console.log(data);
    console.log(hi);
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
