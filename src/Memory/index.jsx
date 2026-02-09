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

  const [maxPioche, setMaxPioche] = useState(mode === 4 ? Math.round(names.length / 12) : 1)
  // console.log('maxPioche', maxPioche)


  const [imagePiecesArray, setImagePiecesArray] = useState([]);
  const [imageDisplayArray, setImageDisplayArray] = useState([]);
  const [numPieceArray, setNumPieceArray] = useState([])

  const [foundArray, setFoundArray] = useState(Array(names.length).fill(false));
  
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
  const [numEmpilement, setNumEmpilement] = useState(0);

  // mis à true quand imageDisplayArray n'a pas de liste vide
  const [diableSwapButton, setDisableSwapButton] = useState(true)
  const [swapping, setSwapping] = useState(false);
  const [pieceToSwap, setPieceToSwap] = useState(null);


  useEffect(() => {
    if (swapping) {
      
      // regarder si les paires sont identiques
      if (firstPiece && secondPiece) {
        setNbCoups(nbCoups + 1)
        if (firstPiece.piece === secondPiece.piece) {
          setPairs(pairs + 1)
          imageDisplayArray[firstPiece.index].pop();
          imageDisplayArray[secondPiece.index].pop();
        }
      }

      // retourner toutes les cartes
      setFirstPiece(null);
      setSecondPiece(null);
      setThirdPiece(null);

      if (pieceToSwap) {
        // enlever la pièce de l'empilement dont on veut la bouger
        imageDisplayArray[pieceToSwap.index].pop();

        // la rajouter dans le premier emplacement vide
        let num = 0;
        while (imageDisplayArray[num].length !== 0 && num < 24) {
          num += 1;
          if (num === pieceToSwap.index)
            num += 1;
        }
        imageDisplayArray[num].push(pieceToSwap.piece)

        setSwapping(false);
        setPieceToSwap(null);
      }
    }
  }, [swapping, pieceToSwap])


  if (addEmpilement && maxPioche > 0) {
    
    // si on clique sur la pioche alors qu'on vient de trouver une paire, on l'enlève
    if (firstPiece && secondPiece) {
      setNbCoups(nbCoups + 1)
      if (firstPiece.piece === secondPiece.piece) {
        setPairs(pairs + 1)
        imageDisplayArray[firstPiece.index].pop();
        imageDisplayArray[secondPiece.index].pop();
      }
    }

    // console.log('empilage')
    const toAdd = imagePiecesArray.slice(24*(numEmpilement+1), 24*(numEmpilement+2))
    // console.log(numEmpilement, toAdd)

    setImageDisplayArray(imageDisplayArray.map((pieceArray, index) => [
      ...pieceArray,
      toAdd[index]
    ] ))

    setNumEmpilement(numEmpilement + 1)
    setAddEmpilement(false)

    setFirstPiece(null);
    setSecondPiece(null);
    setThirdPiece(null);
    setMaxPioche(maxPioche - 1)
    setDisableSwapButton(true)
  }


  useEffect(() => {
    if (startNewGame) {
      setMaxPioche(mode === 4 ? Math.round(names.length / 12) : 1)

      let data;

      data = spiderMemory({ names, images: imagesTheme, pairsFinal: (mode === 4 ? Math.round(names.length / 12) : 1)*12, mode });
      setImagePiecesArray(data.namePieces)
      
      setNumPieceArray(data.pieces);
      setTotalPairs(data.pieces.length / 2)
      // console.log('total pairs', data.pieces.length / 2)
      
      const initializeEmpilement = data.namePieces.slice(0, 24).reduce((acc, piece) => {
        acc.push([piece])
        return acc
      }, [])
      setMaxPioche((mode === 4 ? Math.round(names.length / 12) : 1) - 1)

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
      setPairs(0)
    }
  }, [startNewGame, imagesTheme, names, mode]);

  // console.log('images', imageDisplayArray)

  //--------------- si 2 retourner, le prochain clic les re retourne

   useEffect(() => {
    if (firstPiece && !play && !finish)
      setPlay(true)
    if (firstPiece && secondPiece && pairs+1 === totalPairs) {
      setPlay(false)
      setOpen(true)
      setFinish(true)
      setNbCoups(nbCoups + 1)
      setPairs(pairs + 1)
      // setFirstPiece(null)
      // setSecondPiece(null)
    }
    if (firstPiece && secondPiece && thirdPiece) {

      // console.log('1 et 2', firstPiece, secondPiece)
      // cas pièces identiques
      if ((firstPiece.image === secondPiece.image && mode !== 4) || (firstPiece.piece === secondPiece.piece && mode === 4)) {
        setFoundArray(prev => {
          const newArray = [...prev];
          newArray[firstPiece.image] = true;
          return newArray;
        });
        setPairs(pairs + 1)

        // enlever la dernière image de l'empilement si mode = 4 (pour voir la pièce d'en dessous)
        if (mode === 4) {
          imageDisplayArray[firstPiece.index].pop();
          imageDisplayArray[secondPiece.index].pop();
        }
      }

      // console.log('images', imageDisplayArray)

      // si un emplacement est vide on peut cliquer sur le swap button
      const isEmpilementVide = imageDisplayArray.some(item => item.length === 0)
      // console.log('isEVide', isEmpilementVide)
      if (isEmpilementVide)
        setDisableSwapButton(false)
      else
        setDisableSwapButton(true)

      setFirstPiece(thirdPiece)
      setSecondPiece(null)
      setThirdPiece(null)
      setNbCoups(nbCoups + 1)
    }
  }, [firstPiece, secondPiece, thirdPiece]);

  // console.log('pairs', pairs, totalPairs)

  const [open, setOpen] = useState(true);
  const handleClose = () => {
    setOpen(false);
  };

  const handleBeginAgain = () => {
    setOpen(false);
    setStartNewGame(true);
  };

  // useEffect(() => {
  //   if (pairs === totalPairs && totalPairs !== 0) {
  //     setPlay(false)
  //     setOpen(true)
  //     setFinish(true)
  //   }
  // }, [pairs])

  // console.log('empilement', imageDisplayArray)

  // console.log('found', foundArray)

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
              swapping={swapping}
              setPieceToSwap={setPieceToSwap}
              finish={finish}
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
        maxPioche={maxPioche}
        diableSwapButton={diableSwapButton}
        swapping={swapping}
        setSwapping={setSwapping}
      />

      {finish &&
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