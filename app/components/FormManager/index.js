import {
  Button, Chip, Grid, Input, MenuItem, Select,
} from '@material-ui/core';
import { customQueryService, postObjectsToClass } from 'app/services/parse';
import React, { useEffect, useState } from 'react';
import _ from 'underscore';

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

const retrieveUniqueListOfOrganizations = async () => {
  try {
    const records = await customQueryService(0, 500, 'User', 'adminVerified', true);
    const parsedRecords = JSON.parse(JSON.stringify(records));
    const uniqueRecords = _.uniq(parsedRecords, (x) => x.organization);
    const pluckedRecords = _.pluck(uniqueRecords, 'organization');
    return pluckedRecords;
  } catch (e) {
    return e;
  }
};

const organizations = [
  'Puente',
  'WOF',
  'OWS',
];

const FormManager = () => {
  const [organization, setOrganization] = useState('Puente');
  const [tableData, setTableData] = useState([]);
  useEffect(() => {
    retrieveUniqueListOfOrganizations();
    retrieveCustomData(organization).then((records) => {
      setTableData(records);
    });
  });

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
