import { ClassNames } from '@emotion/react';
import { Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import useStyles from './style';
import { Start } from '@mui/icons-material';

const Timer = ({play = false, time = 0, setTime}) => {

  const classes = useStyles();

  useEffect(() => {
    if (play) {
      const interval = setInterval(() => {
        setTime(prev => prev + 1);
      }, 1000);
      
      return () => clearInterval(interval);
    }
  }, [play]);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return (
    <div>
      <Typography className={classes.timer}>
        {String(minutes).padStart(2, '0')} : {String(seconds).padStart(2, '0')}
      </Typography>
    </div>
  );
};

export default Timer;