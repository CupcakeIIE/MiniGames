import mots from "./mots";

const loadPendu = ({theme = 'potter'}) => {

  const motsPossibles = mots[theme];
  const nbMots = motsPossibles.length;

  const numChoisi = Math.floor(Math.random() * nbMots);
  const motChoisi = motsPossibles[numChoisi]

  const motSplit = motChoisi.split('').reduce((acc, letter) => {
    acc.push({lettre: letter, found: false})
    return acc
  }, [])

  return {motComplet: motChoisi, motSplit: motSplit}
}

export default loadPendu;