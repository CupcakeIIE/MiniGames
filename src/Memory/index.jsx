import { useEffect, useState } from "react";

import { Button, Dialog, DialogActions, DialogContent, Grid } from "@mui/material";

import Piece from "./Piece";
import images from "./images";
import loadGame from "./Memory";
import Compteur from "./Compteur";

const Memory = ({mode = 0, startNewGame = true, setStartNewGame}) => {

  // mode 0 => basic skin
  // mode 1 => random skin differents
  // mode 2 => match skin line

  const names = Object.keys(images);

  //-------------- il y a plus que 12 champions dans la liste, il faut donc selectionner aléatoirement ceux qui seront en jeu
  // et recréer une nouvelle liste à partir de laquelle la suite sera effectuée
  // const [imagesSelected] = useState(() => {
  //   const temp = [];
  //   while (temp.length < 12) {
  //     const imageChosen = names[Math.floor(Math.random() * names.length)];
  //     if (!temp.includes(imageChosen))
  //       temp.push(imageChosen)
  //   }
  //   return temp;
  // })

  // if mode 1
  // selection of the skins
  // const [skinsChosen, setSkinsChosen] = useState(() => {
  //   const tempSkins = imagesSelected.reduce((acc, img) => {
  //     const numeroSkin1 = Math.floor(Math.random() * images[img])
  //     let numeroSkin2 = Math.floor(Math.random() * images[img]);
  //     while (numeroSkin2 === numeroSkin1)
  //       numeroSkin2 = Math.floor(Math.random() * images[img]);
  //     return {...acc, [img]: {'0': numeroSkin1, '1': numeroSkin2}}
  //   }, {})
  //   return tempSkins
  // })

  //-------------- préparer toutes les cellules avec les différentes images (pas plus de 2)
  const totalCells = 24;

  // const [alreadyUsed, setAlreadyUsed] = useState(Array(imagesSelected.length).fill(0));

  // const [pieces] = useState(() => {
  //   const piecesChosen = [];
  //   const used = Array(imagesSelected.length).fill(0);

  //   while (piecesChosen.length < totalCells) {
  //     const numero = Math.floor(Math.random() * imagesSelected.length);
  //     if (used[numero] < 2) {
  //       piecesChosen.push(numero);
  //       used[numero] += 1;
  //     }
  //   }

  //   setAlreadyUsed(used);

  //   return piecesChosen;
  // });


  // mode 1 : choisir lequel des 2 skins va où
  // const [namePieces] = useState(() => {
  //   const usedSkins = Array(imagesSelected.length).fill(-1);
  //   const tempNames = pieces.reduce((acc, numPiece) => {
  //     const name = imagesSelected[numPiece]
  //     let finalNameImage = "";
  //     if (mode === 1) {
  //       if(usedSkins[numPiece] === 0)
  //         finalNameImage = `${name}${skinsChosen[name][1]}`
  //       else if (usedSkins[numPiece] === 1)
  //         finalNameImage = `${name}${skinsChosen[name][0]}`
  //       else {
  //         const oneOrTwo = Math.floor(Math.random() * 2);
  //         finalNameImage = `${name}${skinsChosen[name][oneOrTwo]}`
  //         usedSkins[numPiece] = oneOrTwo
  //       }
  //     }
  //     else if (mode === 0)
  //       finalNameImage = `${name}0`
  //     acc.push(finalNameImage)
  //     return acc
  //   }, [])
  //   return tempNames
  // })

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
      const data = loadGame({ images, names, mode });

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
    }
  }, [startNewGame, images, names, mode]);


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

      <Grid container spacing={2}>
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