import { Card, SearchBar } from 'app/components/molecules';
import React, { useEffect, useState } from 'react';

import retrieveAllFormSpecs from './_data';
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
    refreshMarketplace();
  }, []);

  const refreshMarketplace = () => retrieveAllFormSpecs({
    typeOfForm: 'Marketplace',
  }).then((records) => {
    setFormSpecs(records);
  });

  return (
    <div className={styles.formMarketplace}>
      <h1>Form Marketplace</h1>
      <h2>Most Popular Forms</h2>
      {/* <div className={styles.carousel}>
        <div className={styles.box}>
          {formSpecs.map((form) => (
            <Card
              key={form.objectId}
              title={form.name}
              description={form.description}
              actions={[{ text: 'Duplicate', action: () => passDataToFormCreator(form) }]}
            />
          ))}
        </div>
      </div>
      <div className={styles.searchbar}>
        <SearchBar />
      </div> */}
      <div className={styles.cards}>
        {formSpecs.map((form) => (
          <Card
            key={form.objectId}
            title={form.name}
            description={form.description}
            actions={[{ text: 'Duplicate', action: () => passDataToFormCreator(form) }]}
          />
        ))}
      </div>
    </div>
  );
};

export default FormMarketplace;
