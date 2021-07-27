import { initialize } from 'app/services/parse';

import Footer from './Footer';
import Header from './Header';
import styles from './index.module.scss';

export default function Page({ children }) {
  React.useEffect(() => {
    initialize();
  }, []);

  return (
    <div className={styles.page}>
      <Header>
        {children}
      </Header>
      <Footer />
    </div>
  );
}
