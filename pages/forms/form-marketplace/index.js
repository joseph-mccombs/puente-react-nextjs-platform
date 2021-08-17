import FormMarketplace from 'app/components/organisms/FormMarketplace';
import Page from 'app/components/templates/page-layout';
import { useGlobalState } from 'app/store';
import { useRouter } from 'next/router';

import styles from './index.module.scss';

export default function Marketplace() {
  const { contextManagment } = useGlobalState();
  const router = useRouter();

  return (
    <Page>
      <main className={styles.formMarketplace}>
        <div className={styles.container}>
          <FormMarketplace
            router={router}
            context={contextManagment}
          />
        </div>
      </main>
    </Page>
  );
}
