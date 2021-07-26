import {
  Box,
  Grid, Paper,
} from '@material-ui/core';
import { Carousel } from 'app/components/molecules';
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
      <Carousel items={[{primaryText:"hi",type:'card'}]} />
      {/* <Box
        display="flex"
        flexWrap="wrap"
        justifyContent="center"
      >
        <Box p={20} bgcolor="grey.300">
          Item 1
        </Box>
        <Box p={20} bgcolor="grey.300">
          Item 2
        </Box>
        <Box p={20} bgcolor="grey.300">
          Item 3
        </Box>
        <Box p={20} bgcolor="grey.300">
          Item 4
        </Box>
        <Box p={20} bgcolor="grey.300">
          Item 5
        </Box>
        <Box p={20} bgcolor="grey.300">
          Item 6
        </Box>
      </Box> */}
    </div>
  );
};

export default FormMarketplace;
