import { initialize } from 'app/modules/cloud-code';

import Footer from './Footer';
import Header from './Header';
import styles from './index.module.scss';

export default function Page({ header, footer, children }) {
  React.useEffect(() => {
    initialize();
  }, []);

  return (
    <div className={styles.page}>
      {header
        ? (
          <Header>
            {children}
          </Header>
        )
        : (
          <div>
            {children}
          </div>
        )}
      {footer
        ? <Footer />
        : <div />}
    </div>
  );
}
