import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(theme => ({
  menuButton: {
    "&:focus": {
      outline: "none",
    },
  },
  title: {
    position: 'absolute', 
    left: '50%', 
    transform: 'translateX(-50%)',
  },

  divButtonClose: {
    display: 'flex',
    justifyContent: "flex-end",
  },

  closeButton: {
    "&:focus": {
      outline: "none",
    },
    width: '2em',
    margin: '0.5em 0.5em !important',
  },

  divider: {
    width: '80%',
  },

  formControl: {
    margin: '1em !important'
  },

  formTitle: {
    marginBottom: '0.5em',
    fontSize: '1.2em !important',
  }

}));

export default useStyles;