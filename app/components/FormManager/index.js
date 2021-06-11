import {
  CircularProgress, Grid, MenuItem,
  Select,
} from '@material-ui/core';
import { retrieveCustomData, retrieveUniqueListOfOrganizations } from 'app/modules/parse';
import React, { useEffect, useState } from 'react';

import styles from './index.module.scss';
import Table from './Table';

const FormManager = ({ context, router }) => {
  const [organization, setOrganization] = useState('Puente');
  const [organizationList, setOrganizationList] = useState([]);

  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    retrieveCustomData(organization).then((records) => {
      setTableData(records);
    });
    retrieveUniqueListOfOrganizations().then((results) => {
      setOrganizationList(results);
    });
  }, [organizationList]);

  const handleOrganization = (event) => {
    setOrganization(event.target.value);
  };

  const passDataToFormCreator = (data) => {
    const href = '/forms/form-creator';

    const action = JSON.stringify({
      key: href,
      action: 'duplicate',
    });
    context.addPropToStore(action, data); // contextManagement.removeFromGlobalStoreData(key);
    router.push(href);
  };

  return (
    <div className={styles.formCreator}>
      <Grid container>
        <Grid>
          <h1>Form Manager</h1>
        </Grid>
        <Grid xs={12}>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={organization}
            onChange={handleOrganization}
          >
            {organizationList.length < 1
                  && <CircularProgress />}
            {organizationList.length > 1 && organizationList.map((value) => <MenuItem value>{value}</MenuItem>)}
          </Select>
        </Grid>
        <Grid>
          <Table
            data={tableData}
            retrieveCustomData={retrieveCustomData}
            passDataToFormCreator={passDataToFormCreator}
            organization={organization}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default FormManager;
