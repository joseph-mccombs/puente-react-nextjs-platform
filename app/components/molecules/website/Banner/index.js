import Button from '@material-ui/core/Button';
import ButtonBase from '@material-ui/core/ButtonBase';
import Container from '@material-ui/core/Container';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import { useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Zoom from '@material-ui/core/Zoom';
import CloseIcon from '@material-ui/icons/Close';
import { useText } from 'app/modules/theme/common';
import clsx from 'clsx';
import imgAPI from 'public/images/imgAPI';
import React, { useEffect, useRef, useState } from 'react';
import YouTube from 'react-youtube';

import useStyles from './banner-style';
import yt from './youtube';

const Transition = React.forwardRef(function Transition(props, ref) { // eslint-disable-line
  return <Zoom ref={ref} {...props} />;
});

function Banner() {
  const classes = useStyles();
  const text = useText();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));

  const elem = useRef(null);
  const [hide, setHide] = useState(false);

  const [player, setPlayer] = useState([]);
  const [openPopup, setOpenPopup] = useState(false);

  const handleScroll = () => {
    if (!elem.current) {
      return;
    }
    const doc = document.documentElement;
    const elTop = elem.current.offsetTop - 200;
    const elBottom = elTop + elem.current.getBoundingClientRect().height;
    if (doc.scrollTop > elTop && doc.scrollTop < elBottom) {
      setHide(false);
    } else {
      setHide(true);
    }
  };

  const handleClickOpen = () => {
    if (yt.use) {
      setOpenPopup(true);
      player[0].playVideo();
    }
  };

  const handleClose = () => {
    setOpenPopup(false);
    player[0].pauseVideo();
  };

  const onReady = (event) => {
    player.push(event.target);
    setPlayer(player);
  };

  const opts = {
    height: '360',
    width: '640',
    playerVars: { // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
      controls: 1,
      rel: 0,
      showinfo: 1,
      mute: 0,
      origin: 'https://localhost:3002',
    },
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
  });

  return (
    <div className={classes.root} ref={elem}>
      <Dialog
        open={openPopup}
        TransitionComponent={Transition}
        keepMounted
        classes={{ paper: classes.videoPopup }}
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          Puente
          <IconButton onClick={handleClose} className={classes.closeBtn}>
            <CloseIcon className={classes.icon} />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {yt.use && (
            <YouTube
              videoId="KxZAdEGpYAw"
              onReady={onReady}
              opts={opts}
            />
          )}
        </DialogContent>
      </Dialog>
      <div className={classes.decoration}>
        <svg
          className={classes.leftDeco}
        >
          <use xlinkHref="/images/saas/deco-bg-left.svg#main" />
        </svg>
        <svg
          className={classes.rightDeco}
        >
          <use xlinkHref="/images/saas/deco-bg-right.svg#main" />
        </svg>
      </div>
      <Container fixed={isDesktop}>
        <div className={classes.sliderWrap}>
          <div className={classes.text}>
            <Typography variant="h3" className={text.title}>
              Puente Manage
              &nbsp;
            </Typography>
            <Typography component="p" className={text.subtitle}>
              Management platform for your data collection needs
            </Typography>
            <div className={classes.btnArea}>
              <ButtonBase className={classes.playBtn} onClick={handleClickOpen}>
                <span className={classes.icon}>
                  <i className="ion-ios-play-outline" />
                </span>
                Learn about our work!
              </ButtonBase>
              <Button
                variant="contained"
                color="secondary"
                size="large"
                href="/login"
              >
                Get Started!
              </Button>
            </div>
          </div>
          <div className={classes.illustration}>
            <img src={imgAPI.saas[7]} alt="illustration" />
          </div>
        </div>
      </Container>
      <div className={classes.deco}>
        <Hidden mdDown>
          <div className={clsx(classes.decoInner, hide && classes.hide)}>
            <div className={clsx(classes.wave, classes.waveOne)} />
            <div className={clsx(classes.wave, classes.waveTwo)} />
          </div>
        </Hidden>
        <div className={clsx(classes.wave, classes.waveCover)} />
      </div>
    </div>
  );
}

export default Banner;
