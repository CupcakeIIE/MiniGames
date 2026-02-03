import { useEffect, useState } from "react";
import { Button } from "@mui/material";

import useStyles from "./style";

import images from "./images";

const Piece = ({ 
  numeroPiece, piece,     // numeroPiece -> what image | piece -> which piece on the grid
  firstPiece, setFirstPiece, 
  secondPiece, setSecondPiece, 
  thirdPiece, setThirdPiece, 
  hide = false,
  foundArray,
  imagesSelected = [],
  namePiece = "",
 }) => {

  const classes = useStyles();

  // const namePiece = imagesSelected[numeroPiece];

  const [retournee, setRetournee] = useState(false);
  const clickPiece = () => {
    if (!retournee) {
      if (!firstPiece) {
        setFirstPiece({piece: piece, image: numeroPiece})
        setRetournee(true)
      }
      else if (firstPiece && !secondPiece) {
        setSecondPiece({piece: piece, image: numeroPiece})
        setRetournee(true)
      }
      else if (firstPiece && secondPiece) {
        setThirdPiece({piece: piece, image: numeroPiece})
      }
    }
  }

   useEffect(() => {
    if (hide) {
      setRetournee(false)
      if (firstPiece && firstPiece.piece === piece)
        setRetournee(true)
    }
  }, [hide]);
  

  return (
    <Button className={classes.piece} onClick={clickPiece}>
      {retournee || foundArray[numeroPiece]
        ? <img src={`Memory/${namePiece}.jpg`} width="200" />
        : <img src={`fondRedimension.jpg`} width="200" />
      }
    </Button>
  );
};

export default Piece;