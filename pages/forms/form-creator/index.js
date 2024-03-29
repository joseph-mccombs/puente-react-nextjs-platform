import FormCreator from 'app/components/epics/FormCreator';
import Page from 'app/components/templates/dashboard-layout';
import { useGlobalState } from 'app/store';

import styles from './index.module.scss';

export default function Forms() {
  const { contextManagment } = useGlobalState();

  return (
    <Page
      header
      footer
    >
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
