import { makeStyles } from '@material-ui/core/styles';
import { initialize } from 'app/services/parse';

import Footer from './Footer';
import Header from './Header';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    margin: 0,
    backgroundColor: 'rgba(61,128,252,0.04)',

  },
}));

export default function Page({ children }) {
  const classes = useStyles();

  React.useEffect(() => {
    initialize();
  }, []);

  return (
    <div className={classes.root}>
      <Header>
        {children}
      </Header>
      <Footer />
    </div>
  );
}
