import FormMarketplace from 'app/components/organisms/FormMarketplace';
import Page from 'app/components/templates/page-layout';
import { useGlobalState } from 'app/store';

import styles from './index.module.scss';

export default function Forms() {
  // const { contextManagment } = useGlobalState();

  return (
    <Page>
      <main className={styles.formMarketplace}>
        <div className={styles.container}>
          <FormMarketplace />
        </div>
      </main>
    </Page>
  );
}
