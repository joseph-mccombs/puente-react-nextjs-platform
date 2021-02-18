import { makeStyles } from '@material-ui/core/styles';

import Header from './Header';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    margin: 0,
    backgroundColor: 'rgba(61,128,252,0.04)',

  },
}));

export default function Layout({ children }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Header>
        {children}
      </Header>
    </div>
  );
}
