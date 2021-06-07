import {
  Grid,
} from '@material-ui/core';
//   import { retrieveCustomData } from 'app/modules/parse';
import React, { useEffect, useState } from 'react';

import styles from './index.module.scss';
//   import Table from './Table';

const FormManager = ({ context, router }) => {
  const [organization] = useState('Puente');

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
    <div className={styles.formMarketplace}>
      <Grid container>
        <h1>Form Marketplace</h1>
      </Grid>
    </div>
  );
};

export default FormManager;
