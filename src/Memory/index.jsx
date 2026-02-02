import { useEffect, useState } from "react";

import { Button, Dialog, DialogActions, DialogContent, Grid } from "@mui/material";

import Piece from "./Piece";
import images from "./images";

const Memory = () => {

  //-------------- préparer toutes les cellules avec les différentes images (pas plus de 2)
  const totalCells = 24;

  const [alreadyUsed, setAlreadyUsed] = useState(Array(images.length).fill(0));

  const [pieces] = useState(() => {
    const piecesChosen = [];
    const used = Array(images.length).fill(0);

    while (piecesChosen.length < totalCells) {
      const numero = Math.floor(Math.random() * images.length);
      if (used[numero] < 2) {
        piecesChosen.push(numero);
        used[numero] += 1;
      }
    }

    setAlreadyUsed(used);

    return piecesChosen;
  });


  //--------------- si 2 retourner, le prochain clic les re retourne
  const [foundArray, setFoundArray] = useState(Array(images.length).fill(false));

  const [hide, setHide] = useState(false);

  const [firstPiece, setFirstPiece] = useState(null)
  const [secondPiece, setSecondPiece] = useState(null)
  const [thirdPiece, setThirdPiece] = useState(null)


   useEffect(() => {
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
              />
          </Grid>
        ))}
      </Grid>

      {nbFound === totalCells / 2 &&
        <Dialog
          open={open}
          onClose={handleClose}
        >
          <DialogContent>Victory !</DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Ok</Button>
          </DialogActions>
        </Dialog>
      }
    </>
  );
};

export default Memory;