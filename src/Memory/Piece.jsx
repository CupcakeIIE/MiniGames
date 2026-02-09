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
  swapping = false,
  setPieceToSwap,
  finish = false,
 }) => {

  const classes = useStyles();

  // const namePiece = imagesSelected[numeroPiece];

  const [retournee, setRetournee] = useState(false);

  let imagePiece;
  if (pieceEmpileesArray.length > 0) {
    imagePiece = pieceEmpileesArray.at(-1);
  }

  const numPiece = numPieceArray[numEmpilement*24 + index];

  const epaisseur = pieceEmpileesArray.length;


  const clickPiece = () => {
    if (finish)
      return
    if (swapping) {
      setPieceToSwap({piece: imagePiece, image: numPiece, index: index})
    }

    else {
      if (!retournee && !(foundArray[numPiece] && mode !== 4)) {
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
    }
  }


  useEffect(() => {
    if (firstPiece?.index != index && secondPiece?.index != index && thirdPiece?.index != index)
        setRetournee(false)
    else
      setRetournee(true)
  }, [firstPiece, secondPiece, thirdPiece])
  
  if (pieceEmpileesArray.length <= 0 /* || (foundArray[numPiece] */ && mode === 4/* ) */) {
    // console.log('disparait')
    return <div style={{ width: 189.5, height: 110 }} />;
  }

  // console.log(foundArray)

  return (
    // <Button 
    //   style={{marginLeft: epaisseur-1, marginTop: epaisseur-1}}
    //   className={(firstPiece?.index === index || secondPiece?.index === index) ? classes.pieceBordure : classes.piece} 
    //   onClick={clickPiece}
    // >
    //   {retournee || (foundArray[numPiece] && mode !== 4)
    //     ? <img src={`${theme}/${imagePiece}.jpg`} /* width="200" */ className={classes.image} />
    //     : <img src={`${theme}/fondRedimension.jpg`} /* width="200" */ className={classes.image} />
    //   }
    // </Button>
    <div className={/* (firstPiece?.index === index || secondPiece?.index === index) ? classes.cellBordure :  */classes.cell} >
      {Array.from({ length: epaisseur }).map((_, i) => {
        const isLast = i === epaisseur - 1;
        return (
          <Button
          key={i}
            className={((firstPiece?.index === index || secondPiece?.index === index) && isLast) ? classes.pieceBordure : classes.piece}
            style={{
              top: i*10,
              left: i*10,
              zIndex: i
            }}
            onClick={clickPiece}
          >
            <img
              src={
                (retournee || (foundArray[numPiece] && mode !== 4)) && isLast
                  ? `${theme}/${imagePiece}.jpg`
                  : `${theme}/fondRedimension.jpg`
              }
              className={classes.image}
            />
          </Button>
      )})}
    </div>
  );
};

export default Piece;