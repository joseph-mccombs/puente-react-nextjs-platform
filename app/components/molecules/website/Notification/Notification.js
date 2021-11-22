import Button from '@material-ui/core/Button';
import Slide from '@material-ui/core/Slide';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'next-i18next';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import useStyles from './notification-style';

function TransitionUp(props) {
  return <Slide {...props} direction="up" />;
}

function Notification() {
  const { t } = useTranslation('common');
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Snackbar
      TransitionComponent={TransitionUp}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      classes={{
        root: classes.notification,
      }}
      open={open}
      onClose={handleClose}
    >
      <SnackbarContent
        message={<Typography id="message-id">{t('common:notif_msg')}</Typography>}
        classes={{
          action: classes.action,
        }}
        action={(
          <Button color="secondary" variant="contained" className={classes.button} onClick={handleClose}>
            {t('common:accept')}
          </Button>
        )}
      />
    </Snackbar>
  );
}

Notification.propTypes = {
  t: PropTypes.func.isRequired,
};

export default Notification;
