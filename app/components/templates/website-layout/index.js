import brand from 'public/text/brand';

import Head from './Head';
import styles from './index.module.scss';

const Page = ({ children }) => (
  <div className={styles.page}>
    <Head>
      <title>
        { brand.agency.name }
          &nbsp; - Home Page
      </title>
    </Head>
    {children}
  </div>
);

export default Page;
