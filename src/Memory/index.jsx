import { useEffect, useState } from "react";

import { Button, Dialog, DialogActions, DialogContent, Grid } from "@mui/material";

import Piece from "./Piece";
import images from "./images";
import loadGame from "./Memory";
import Compteur from "./Compteur";

const Memory = ({mode = 0, startNewGame = true, setStartNewGame, theme = 'lol'}) => {

  // mode 0 => basic skin
  // mode 1 => random skin differents
  // mode 2 => match skin line

  const imagesTheme = images[theme];
  console.log('images', imagesTheme)
  console.log('mode/theme', theme, mode)

  const names = Object.keys(imagesTheme);


  const totalCells = 24;


  const [namePieces, setNamePieces] = useState([]);
  const [pieces, setPieces] = useState([]);
  const [imagesSelected, setImagesSelected] = useState([]);

  
  const [foundArray, setFoundArray] = useState(Array(imagesSelected.length).fill(false));
  

  const [hide, setHide] = useState(false);

  const [firstPiece, setFirstPiece] = useState(null)
  const [secondPiece, setSecondPiece] = useState(null)
  const [thirdPiece, setThirdPiece] = useState(null)

  const [nbCoups, setNbCoups] = useState(0)

  const [play, setPlay] = useState(false);
  const [finish, setFinish] = useState(false);
  const [time, setTime] = useState(0);



  useEffect(() => {
    if (startNewGame) {
      const data = loadGame({ images: imagesTheme, names, mode });

      setNamePieces(data.namePieces);
      setPieces(data.pieces);
      setImagesSelected(data.imagesSelected);

      setStartNewGame(false);

      setFoundArray(Array(imagesSelected.length).fill(false))
      setFirstPiece(null);
      setSecondPiece(null);
      setThirdPiece(null);
      setNbCoups(0);
      setHide(true)
      setFinish(false);
      setTime(0)
      setPlay(false)
    }
  }, [startNewGame, imagesTheme, names, mode]);


  //--------------- si 2 retourner, le prochain clic les re retourne

   useEffect(() => {
    if (firstPiece && !play && !finish)
      setPlay(true)
    if (firstPiece && secondPiece && thirdPiece) {

      // cas pièces identiques
      if (firstPiece.image === secondPiece.image) {
        setFoundArray(prev => {
          const newArray = [...prev];
          newArray[firstPiece.image] = true;
          return newArray;
        });
      }

      setHide(true)
      setFirstPiece(thirdPiece)
      setSecondPiece(null)
      setThirdPiece(null)
      setNbCoups(nbCoups + 1)
    }
    else
      setHide(false)
  }, [firstPiece, secondPiece, thirdPiece]);


  // get number of pairs found
  const nbFound = foundArray.reduce((acc, piece) => {
    if (piece)
      acc += 1
    return acc
  }, 0)

  const [open, setOpen] = useState(true);
  const handleClose = () => {
    setOpen(false);
  };

  const handleBeginAgain = () => {
    setOpen(false);
    setStartNewGame(true);
  };

  useEffect(() => {
    if (nbFound === 12) {
      setPlay(false)
      setOpen(true)
      setFinish(true)
    }
  }, [nbFound])

  return (
    <>

      {/* grille de 4 lignes de 6 images */}

      <Grid container spacing={2} style={{paddingTop: '5em'}}>
        {pieces.map((numeroPiece, index) => (
          <Grid key={index}>
            <Piece 
              piece={index}
              numeroPiece={numeroPiece} 
              firstPiece={firstPiece}
              setFirstPiece={setFirstPiece}
              secondPiece={secondPiece}
              setSecondPiece={setSecondPiece}
              thirdPiece={thirdPiece}
              setThirdPiece={setThirdPiece}
              hide={hide}
              foundArray={foundArray}
              imagesSelected={imagesSelected}
              namePiece={namePieces[index]}
              finish={finish}
              theme={theme}
              />
          </Grid>
        ))}
      </Grid>

      <Compteur coups={nbCoups} play={play} time={time} setTime={setTime} />

      {nbFound === totalCells / 2 &&
        <Dialog
          open={open}
          onClose={handleClose}
        >
          <DialogContent style={{alignItems: 'center', justifyContent: 'center', display: 'flex'}}>Victory !</DialogContent>
          <DialogActions>
            <Button onClick={handleBeginAgain}>Recommencer</Button>
            <Button onClick={handleClose}>Fermer</Button>
          </DialogActions>
        </Dialog>
      }
    </>
  );
};

export default Memory;