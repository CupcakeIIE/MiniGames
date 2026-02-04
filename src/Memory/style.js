import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(theme => ({
  piece: {
    padding: '0px !important',
  },

  // Compteur style
  paper: {
    position: 'absolute',
    bottom: '0px',
    left: '50%',
    padding: '1.3em',
    display: 'flex',
    flexDirection: 'row',
    transform: 'translateX(-50%)',
    width: '20%',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopLeftRadius: '20px !important',
    borderTopRightRadius: '20px !important',
  },
  timer: {
    paddingLeft: '3em',
  },
  nbCoups: {
    paddingRight: '3em',
  },

}));

export default useStyles;