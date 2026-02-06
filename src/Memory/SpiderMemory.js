const spiderMemory = ({names = []}) => {
  
  // order randomly pieces in an array
  // the first 12 => displayed on the screen
  // the rest in the pioche
  // when clicking on the pioche, will display the next 12
  // until pioche is empty

  const nbPairs = names.length;

  console.log('nbPairs', nbPairs)

  const pioche = [];
  const used = Array(nbPairs).fill(0);

  while (pioche.length < nbPairs*2) {
    const numero = Math.floor(Math.random() * nbPairs);
    if (used[numero] < 2) {
      pioche.push(numero);
      used[numero] += 1;
    }
  }

  
  const namePieces = pioche.reduce((acc, numPiece) => {
    const name = names[numPiece]
    let finalNameImage = `${name}0`
    acc.push(finalNameImage)
    return acc
  }, [])

  console.log('pioche', pioche)

  return {pioche, namePieces};
}

export default spiderMemory;