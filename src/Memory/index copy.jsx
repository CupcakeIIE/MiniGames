import { useEffect, useState } from "react";

import { Button, Dialog, DialogActions, DialogContent, Grid } from "@mui/material";

import Piece from "./Piece";
import images from "./images";
import loadGame from "./Memory";
import Compteur from "./Compteur";
import spiderMemory from "./SpiderMemory";

const Memory = ({mode = 0, startNewGame = true, setStartNewGame, theme = 'lol'}) => {

  const imagesTheme = images[theme];

  // ['ahri', 'aphelios', ...]
  const names = Object.keys(imagesTheme);


  const totalCells = 24;


  const [imagePiecesArray, setImagePiecesArray] = useState([]);
  const [imageDisplayArray, setImageDisplayArray] = useState([]);
  const [numPieceArray, setNumPieceArray] = useState([])

  const [foundArray, setFoundArray] = useState(Array(imagePiecesArray.length).fill(false));
  
  // les pièces retournées
  const [firstPiece, setFirstPiece] = useState(null)
  const [secondPiece, setSecondPiece] = useState(null)
  const [thirdPiece, setThirdPiece] = useState(null)

  // pour le compteur
  const [nbCoups, setNbCoups] = useState(0)
  const [pairs, setPairs] = useState(0)
  const [totalPairs, setTotalPairs] = useState(0)
  const [time, setTime] = useState(0);

  // l'état de laa game
  const [play, setPlay] = useState(false);
  const [finish, setFinish] = useState(false);

  // quand clic sur la pioche (uniquement pour le spiderMemory)
  const [addEmpilement, setAddEmpilement] = useState(false)
  const [numEmpilement, setNumEmpilement] = useState(1);


  if (addEmpilement) {
    // console.log('empilage')
    const toAdd = imagePiecesArray.slice(24*numEmpilement, 24*(numEmpilement+1))

    setImageDisplayArray(imagePiecesArray.map((pieceArray, index) => [
      ...pieceArray,
      toAdd[index]
    ] ))

    setNumEmpilement(numEmpilement + 1)
    setAddEmpilement(false)
  }


  useEffect(() => {
    if (startNewGame) {
      let data;

      data = spiderMemory({ names, pairsFinal: (mode === 4 ? names.length : 12) });
      setImagePiecesArray(data.namePieces)
      
      setNumPieceArray(data.pieces.slice(0, 24));
      setTotalPairs(data.pieces.length / 2)
      
      const initializeEmpilement = data.namePieces.slice(0, 24).reduce((acc, piece) => {
        acc.push([piece])
        return acc
      }, [])

      setImageDisplayArray(initializeEmpilement)

      setStartNewGame(false);

      setFoundArray(Array(data.pieces.length / 2).fill(false))
      setFirstPiece(null);
      setSecondPiece(null);
      setThirdPiece(null);
      setNbCoups(0);
      // setHide(true)
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

      // console.log('1 et 2', firstPiece, secondPiece)
      // cas pièces identiques
      if (firstPiece.image === secondPiece.image) {
        setFoundArray(prev => {
          const newArray = [...prev];
          newArray[firstPiece.image] = true;
          return newArray;
        });
        setPairs(pairs + 1)
      }

      setFirstPiece(thirdPiece)
      setSecondPiece(null)
      setThirdPiece(null)
      setNbCoups(nbCoups + 1)
    }
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

  // console.log('empilement', empilement)

  return (
    <>

      {/* grille de 4 lignes de 6 images */}

      <Grid container spacing={2} style={{paddingTop: '5em', }}>
        {imageDisplayArray.map((piecesEmpileesArray, index) => (
          <Grid key={index}>
            <Piece 
              firstPiece={firstPiece} setFirstPiece={setFirstPiece}
              secondPiece={secondPiece} setSecondPiece={setSecondPiece}
              thirdPiece={thirdPiece} setThirdPiece={setThirdPiece}
              foundArray={foundArray}
              numPieceArray={numPieceArray}
              index={index}
              numEmpilement={numEmpilement}
              theme={theme}
              mode={mode}
              pieceEmpileesArray={piecesEmpileesArray}
              />
          </Grid>
        ))}
      </Grid>

      <Compteur 
        coups={nbCoups} 
        play={play} 
        time={time} 
        setTime={setTime} 
        mode={mode} 
        pairs={pairs}
        totalPairs={totalPairs}
        setAddEmpilement={setAddEmpilement}
      />

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