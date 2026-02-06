import { Divider, Paper, Typography } from "@mui/material";
import InfoOutlineIcon from '@mui/icons-material/InfoOutline';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';

import useStyles from "./style";

import Timer from "./Timer";


const Compteur = ({coups = 0, play = false, time = 0, setTime, mode = 0}) => {

  const classes = useStyles();

  return (
    <div className={classes.divBottomInfo}>
      {mode === 4 && <LibraryAddIcon className={classes.piocheIcon} />}
      <Paper className={classes.paper} elevation='8'>
        <Timer play={play} time={time} setTime={setTime} />
        {mode === 4 &&
          <>
            <Divider orientation="vertical" flexItem />
            <Typography>4 / 12 paires</Typography>
          </>
        }
        <Divider orientation="vertical" flexItem />
        <Typography className={classes.nbCoups}>{coups} {coups > 1 ? 'coups' : 'coup'}</Typography>
      </Paper>
      <InfoOutlineIcon className={classes.infoIcon} />
    </div>
  )
}

export default Compteur;