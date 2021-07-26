import {
  Box,
  Grid, Paper,
} from '@material-ui/core';
import { Carousel, SearchBar } from 'app/components/molecules';
import { retrieveCustomData } from 'app/modules/parse';
import React, { useEffect, useState } from 'react';

import styles from './index.module.scss';

const FormMarketplace = ({ context, router }) => {
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
      <h2>Most Popular</h2>
      <Carousel items={[{primaryText:"hi",type:'card'}]} />
      <div>
      <SearchBar />
      </div>
    </div>
  );
};

export default FormMarketplace;
