const spiderMemory = ({names = [], images = {}, pairsFinal = 0, mode = 0}) => {
  
  // order randomly pieces in an array
  // the first 24 => displayed on the screen
  // the rest in the pioche
  // when clicking on the pioche, will display the next 12
  // until pioche is empty

  // choisir 12 numero dans la liste pour les memory autre que le spider


  // console.log('nbPairs', pairsFinal)

  const pieces = [];
  const used = Array(pairsFinal).fill(0);

  // mode 1
  const numberSelected = [];
  let skinsChosen = {};

  if (mode === 4) {
    while (pieces.length < pairsFinal*2) {
      const numero = Math.floor(Math.random() * pairsFinal);
      if (used[numero] < 2) {
        pieces.push(numero);
        used[numero] += 1;
      }
    }
  }
  else {
    // récup 12 numero => savoir lesquels prendre dans la liste de noms
    while (numberSelected.length < 12) {
    const numberChosen = Math.floor(Math.random() * names.length);
    if (!numberSelected.includes(numberChosen))
      numberSelected.push(numberChosen)
    }

    // associer à chaque pièce un numero au hasard
    while (pieces.length < pairsFinal*2) {
      const numero = Math.floor(Math.random() * pairsFinal);
      if (used[numero] < 2) {
        pieces.push(numberSelected[numero]);
        used[numero] += 1;
      }
    }

    // pour le niveau 2 => 2 skins différents = choisir les skins
    if (mode === 1) {
      skinsChosen = numberSelected.reduce((acc, num) => {
        const numeroSkin1 = Math.floor(Math.random() * images[names[num]])
        let numeroSkin2 = Math.floor(Math.random() * images[names[num]]);
        while (numeroSkin2 === numeroSkin1)
          numeroSkin2 = Math.floor(Math.random() * images[names[num]]);
        return {...acc, [names[num]]: {'0': numeroSkin1, '1': numeroSkin2}}
      }, {})
    }
  }
    
  // console.log('skins', skinsChosen)
  
  // 4 - associate image with pieces
  const usedSkins = Array(numberSelected.length).fill(-1);
  const namePieces = pieces.reduce((acc, numPiece) => {
    const name = names[numPiece]
    let finalNameImage = "";
    if (mode === 1) {
      if(usedSkins[numPiece] === 0)
        finalNameImage = `${name}${skinsChosen[name][1]}`
      else if (usedSkins[numPiece] === 1)
        finalNameImage = `${name}${skinsChosen[name][0]}`
      else {
        const oneOrTwo = Math.floor(Math.random() * 2);
        finalNameImage = `${name}${skinsChosen[name][oneOrTwo]}`
        usedSkins[numPiece] = oneOrTwo
      }
    }
    else if (mode === 0 || mode === 4)
      finalNameImage = `${name}0`
    acc.push(finalNameImage)
    return acc
  }, [])

  // const namePieces = pieces.reduce((acc, numPiece) => {
  //   const name = names[numPiece]
  //   let finalNameImage = `${name}0`
  //   acc.push(finalNameImage)
  //   return acc
  // }, [])

  console.log('pieces', namePieces)
  console.log('pieces', pieces)

  return {pieces: pieces.slice(0, pairsFinal*2), namePieces: namePieces.slice(0, pairsFinal*2)};
}

export default spiderMemory;