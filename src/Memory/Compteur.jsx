import { Divider, IconButton, Paper, Typography } from "@mui/material";
import InfoOutlineIcon from '@mui/icons-material/InfoOutline';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import AutorenewIcon from '@mui/icons-material/Autorenew';

import useStyles from "./style";

import Timer from "./Timer";


const Compteur = ({
  coups = 0, 
  play = false, 
  time = 0, 
  setTime, 
  mode = 0, 
  pairs = 0, 
  totalPairs = 0, 
  setAddEmpilement, 
  maxPioche = 0,
  diableSwapButton = true,
  swapping = false,
  setSwapping,
  setOpenInfos,
}) => {

  const classes = useStyles();

  return (
    <div className={classes.divBottomInfo}>
      {mode === 4 &&
        <>
          <IconButton className={classes.piocheIcon} disabled={maxPioche<=0} onClick={() => setAddEmpilement(true)}>
            <LibraryAddIcon />
          </IconButton>
          <IconButton color={swapping ? 'primary' : 'inherit'} disabled={diableSwapButton} className={classes.piocheIcon} onClick={() => setSwapping(true)}>
            <AutorenewIcon />
          </IconButton>
        </>
      }
      <Paper className={classes.paper} elevation='8'>
        <Timer play={play} time={time} setTime={setTime} />
        <Divider orientation="vertical" flexItem />
        <Typography>{pairs} / {totalPairs} paires</Typography>
        <Divider orientation="vertical" flexItem />
        <Typography className={classes.nbCoups}>{coups} {coups > 1 ? 'coups' : 'coup'}</Typography>
      </Paper>
      <IconButton className={classes.infoIcon} onClick={() => setOpenInfos(true)}>
        <InfoOutlineIcon />
      </IconButton>
    </div>
  )
}

export default Compteur;