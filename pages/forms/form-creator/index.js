import FormCreator from 'app/components/organisms/FormCreator';
import Page from 'app/components/templates/dashboard-layout';
import { useGlobalState } from 'app/store';

import styles from './index.module.scss';

export default function Forms() {
  const { contextManagment } = useGlobalState();

  return (
    <Page>
      <main className={styles.formCreator}>
        <div className={styles.container}>
          <FormCreator
            context={contextManagment}
          />
        </div>
      </main>
    </Page>
  );
}
