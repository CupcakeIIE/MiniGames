const loadGame = ({images = {}, names = [], mode = 0}) => {

  const totalCells = 24;

  // 1 - choose 12 champions
  const imagesSelected = [];
  while (imagesSelected.length < 12) {
    const imageChosen = names[Math.floor(Math.random() * names.length)];
    if (!imagesSelected.includes(imageChosen))
      imagesSelected.push(imageChosen)
  }

  // 2 - choose skins
  let skinsChosen = {};
  if (mode === 1) {
    skinsChosen = imagesSelected.reduce((acc, img) => {
      const numeroSkin1 = Math.floor(Math.random() * images[img])
      let numeroSkin2 = Math.floor(Math.random() * images[img]);
      while (numeroSkin2 === numeroSkin1)
        numeroSkin2 = Math.floor(Math.random() * images[img]);
      return {...acc, [img]: {'0': numeroSkin1, '1': numeroSkin2}}
    }, {})
  }

  // 3 - associate en champion to each cell
  const pieces = [];
  const used = Array(imagesSelected.length).fill(0);

  while (pieces.length < totalCells) {
    const numero = Math.floor(Math.random() * imagesSelected.length);
    if (used[numero] < 2) {
      pieces.push(numero);
      used[numero] += 1;
    }
  }

  // 4 - associate image with pieces
  const usedSkins = Array(imagesSelected.length).fill(-1);
  const namePieces = pieces.reduce((acc, numPiece) => {
    const name = imagesSelected[numPiece]
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
    else if (mode === 0)
      finalNameImage = `${name}0`
    acc.push(finalNameImage)
    return acc
  }, [])

  return {namePieces, pieces, imagesSelected}
}

export default loadGame;