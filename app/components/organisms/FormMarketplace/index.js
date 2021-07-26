import { SearchBar } from 'app/components/molecules';
import React, { useEffect, useState } from 'react';

import retrieveAllFormSpecs from './_data';
import Carousel from './Carousel';
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

  const [formSpecs, setFormSpecs] = useState([]);

  useEffect(() => {
    retrieveAllFormSpecs({
      typeOfForm: 'Marketplace',
    }).then((records) => {
      setFormSpecs(records);
    });
  });

  return (
    <div className={styles.formMarketplace}>
      <h1>Form Marketplace</h1>
      <h2>Most Popular</h2>
      <Carousel items={formSpecs} />
      <div className={styles.searchbar}>
        <SearchBar />
      </div>
    </div>
  );
};

export default FormMarketplace;
