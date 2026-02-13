import { useEffect, useState } from "react";

import { Grid, Button, Dialog, DialogContent, DialogActions, IconButton } from "@mui/material";
import InfoOutlineIcon from '@mui/icons-material/InfoOutline';

import loadPendu from "./pendu"

const Pendu = ({ startNewGame = true, setStartNewGame, theme = 'potter', setOpenInfos}) => {

  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  const [play, setPlay] = useState(false);
  const [victory, setVictory] = useState(false);

  const [etapePendu, setEtapePendu] = useState(0)
  const [motComplet, setMotComplet] = useState("")
  const [mot, setMot] = useState([])
  const [touches, setTouches] = useState({})

  useEffect(() => {
    if (startNewGame) {
      const data = loadPendu({theme})

      setTouches(letters.reduce((acc, letter) => {
        acc[letter] = false;
        return acc;
      }, {}))

      setMotComplet(data.motComplet)
      setMot(data.motSplit)

      setEtapePendu(0)

      setPlay(true)
      setVictory(false)
      setStartNewGame(false)
    }
  }, [startNewGame, theme])


  const clickLetter = (touche) => {
    if (play) {
      if (!motComplet.includes(touche.toLowerCase()))
        setEtapePendu(etapePendu+1)
      else {
        setMot(mot.map(l => {
          if (l.lettre === touche.toLowerCase())
            return {lettre: l.lettre, found: true}
          else
            return l
        }))
      }
      touches[touche] = true
    }
  }

  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  
  const handleBeginAgain = () => {
    setOpen(false);
    setStartNewGame(true);
  };


  // conditions de victoire
  if ((etapePendu >= 11 || !mot.some(lettre => !lettre.found)) && !open && play) {
    setOpen(true)
    setPlay(false)
    if (etapePendu < 11)
      setVictory(true)
  }

  return (
    <>
      <img src={`pendu/pendu${etapePendu}.jpg`} width='500' style={{paddingTop: '5em'}} />

      <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
        {mot.map((lettre, index) => (
          <div 
          key={index}
          style={{
            borderBottom: '3px solid #000',
            padding: '20px',  
            width: '80px', 
            height: '30px',
            fontSize: '20px',
            margin: '1em',
            marginTop: '0' }}>
            {lettre.found ? lettre.lettre.toUpperCase() : " "}</div>
        ))}
      </div>

      <Grid container spacing={2} style={{paddingTop: '2em', justifyContent: 'center'}}>
        {Object.keys(touches).map((touche, index) => (
          <Grid key={index} size={1}>
            <Button variant='contained' disabled={touches[touche]} onClick={() => clickLetter(touche)}>{touche}</Button>
          </Grid>
        ))}
        
        <Grid size={1}>
          <IconButton onClick={() => setOpenInfos(true)}>
            <InfoOutlineIcon /* className={classes.infoIcon} */ />
          </IconButton>
        </Grid>
      </Grid>

      
      {open &&
        <Dialog
          open={open}
          onClose={handleClose}
        >
          <DialogContent style={{alignItems: 'center', justifyContent: 'center', display: 'flex'}}>
            {victory ? "Victory !" : `Perdu ! Le mot était ${motComplet}`}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleBeginAgain}>Recommencer</Button>
            <Button onClick={handleClose}>Fermer</Button>
          </DialogActions>
        </Dialog>}
    </>
  );

}

export default Pendu;