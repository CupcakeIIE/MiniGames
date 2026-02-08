import { useEffect, useState } from "react";
import { Button } from "@mui/material";

import useStyles from "./style";

const Piece = ({ 
  firstPiece, setFirstPiece, 
  secondPiece, setSecondPiece, 
  thirdPiece, setThirdPiece, 
  // hide = false,
  foundArray = [],
  numPieceArray = [],
  index = 0,
  numEmpilement = 0,
  // finish = false,
  theme = 'lol',
  mode = 0,
  pieceEmpileesArray = [],
 }) => {

  const classes = useStyles();

  // const namePiece = imagesSelected[numeroPiece];

  const [retournee, setRetournee] = useState(false);

  let imagePiece;
  if (pieceEmpileesArray.length > 0) {
    imagePiece = pieceEmpileesArray.at(-1);
  }

  const numPiece = numPieceArray[numEmpilement*24 + index];


  const clickPiece = () => {
    // console.log('num', numPiece, imagePiece)
    if (!retournee/*  && !finish */) {
      if (!firstPiece) {
        setFirstPiece({piece: imagePiece, image: numPiece, index: index})
        setRetournee(true)
      }
      else if (firstPiece && !secondPiece) {
        setSecondPiece({piece: imagePiece, image: numPiece, index: index})
        setRetournee(true)
      }
      else if (firstPiece && secondPiece) {
        setThirdPiece({piece: imagePiece, image: numPiece, index: index})
      }
    }
    // console.log('fst', firstPiece, secondPiece, thirdPiece, imagePiece, index)
  }

   /* useEffect(() => {
    if (hide) {
      setRetournee(false)
      if (firstPiece && firstPiece.piece === piece)
        setRetournee(true)
    }
  }, [hide]); */


  useEffect(() => {
    if (firstPiece?.index != index && secondPiece?.index != index && thirdPiece?.index != index)
        setRetournee(false)
    else
      setRetournee(true)
  }, [firstPiece, secondPiece, thirdPiece])
  
  if (pieceEmpileesArray.length <= 0 /* || (foundArray[numPiece] */ && mode === 4/* ) */) {
    // console.log('disparait')
    return <div style={{ width: 200, height: 118 }} />;
  }

  // console.log(foundArray)

  return (
    <Button className={classes.piece} onClick={clickPiece}>
      {retournee || (foundArray[numPiece] && mode !== 4)
        ? <img src={`${theme}/${imagePiece}.jpg`} width="200" /* className={classes.image} */ />
        : <img src={`${theme}/fondRedimension.jpg`} width="200" /* className={classes.image} */ />
      }
    </Button>
  );
};

export default Piece;