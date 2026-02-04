import { Divider, Paper, Typography } from "@mui/material";
import useStyles from "./style";
import Timer from "./Timer";

const Compteur = ({coups = 0, play = false, time = 0, setTime}) => {

  const classes = useStyles();

  return (
    <>
      <Paper className={classes.paper} elevation='8'>
        <Timer play={play} time={time} setTime={setTime} />
        <Divider orientation="vertical" flexItem />
        <Typography className={classes.nbCoups}>{coups} {coups > 1 ? 'coups' : 'coup'}</Typography>
      </Paper>
    </>
  )
}

export default Compteur;