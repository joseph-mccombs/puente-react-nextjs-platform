import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import CreateIcon from '@material-ui/icons/Create';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import GetAppIcon from '@material-ui/icons/GetApp';
import PieChartIcon from '@material-ui/icons/PieChart';
import StoreIcon from '@material-ui/icons/Store';
import { retrieveSignOutFunction } from 'app/modules/user';
import clsx from 'clsx';
import React from 'react';

import HeaderItem from './HeaderItem';
import useStyles from './index.style';

export default function Header({ children }) {
  const classes = useStyles();
  const [open, setDrawerOpen] = React.useState(false);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          {open && <h1>Puente</h1>}
          <IconButton onClick={() => setDrawerOpen(!open)}>
            {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          <HeaderItem link="/forms/form-marketplace" text="Marketplace">
            <StoreIcon />
          </HeaderItem>
          <HeaderItem link="/forms/form-manager" text="Manager">
            <FormatListBulletedIcon />
          </HeaderItem>
          <HeaderItem link="/forms/form-creator" text="Creator">
            <CreateIcon />
          </HeaderItem>
          <HeaderItem link="/data/data-exporter" text="Exporter">
            <GetAppIcon />
          </HeaderItem>
        </List>
        {/* <Divider />
        <List>
          <HeaderItem link="/data/data-visualization" text="Visualization">
            <PieChartIcon />
          </HeaderItem>
        </List> */}
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  );
}
