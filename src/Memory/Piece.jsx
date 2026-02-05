import { useEffect, useState } from "react";
import { Button } from "@mui/material";

import useStyles from "./style";

const Piece = ({ 
  numeroPiece, piece,     // numeroPiece -> what image | piece -> which piece on the grid
  firstPiece, setFirstPiece, 
  secondPiece, setSecondPiece, 
  thirdPiece, setThirdPiece, 
  hide = false,
  foundArray,
  imagesSelected = [],
  namePiece = "",
  finish = false,
  theme = 'lol',
 }) => {

  const classes = useStyles();

  // const namePiece = imagesSelected[numeroPiece];

  const [retournee, setRetournee] = useState(false);
  const clickPiece = () => {
    if (!retournee && !finish) {
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
        ? <img src={`${theme}/${namePiece}.jpg`} width="200" />
        : <img src={`${theme}/fondRedimension.jpg`} width="200" />
      }
    </Button>
  );
};

export default Piece;