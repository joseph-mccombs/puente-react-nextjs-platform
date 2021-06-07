import {
  Grid,
} from '@material-ui/core';
import { retrieveCustomData } from 'app/modules/parse';
import React, { useEffect, useState } from 'react';

import styles from './index.module.scss';

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
      <h1>Form Marketplace</h1>
      <Grid container />
    </div>
  );
};

export default FormManager;
