import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(theme => ({
  piece: {
    padding: '0px !important',
    // width: '100%',
    // height: '100%',
  },

  image: {
    objectFit: 'contain',
    width: '100%',
    height: '100%',
    display: 'block',
  },

  // Compteur style
  paper: {
    // position: 'sticky',
    // position: 'absolute',
    // bottom: '0px',
    // left: '50%',
    padding: '1.3em',
    display: 'flex',
    flexDirection: 'row',
    // transform: 'translateX(-50%)',
    width: '35%',
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

  divBottomInfo: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: '0px',
    position: 'absolute',
    width: '83%',
  },

  infoIcon: {
    marginLeft: '1em',
  },

  piocheIcon: {
    marginRight: '1em !important',
  }

}));

export default useStyles;