import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

const Informations = ({openInfos = false, setOpenInfos, mode = 0,}) => {

  const textInfos = {
    0: {titre: 'Memory', infos: 'Trouver les images identiques et assemblez les en paires'},
    1: {titre: 'Memory - Niveau 2', infos: 'Trouver les images représentant le même champion et assemblez les en paires'},
    2: {titre: 'Memory - Niveau 3', infos: 'Trouver les images appartenant à la même lignée de skins et assemblez les en paires'},
    4: {titre: 'SpiderMemory', infos: "Trouver les images identiques et assemblez les en paires. Si vous êtes bloqué, cliquez sur la pioche (bouton en bas, le premier sur la gauche) pour rajouter des images. Vous pouvez également déplacer une carte d'une pile jusqu'à une pile vide, pour ce faire cliquez sur le bouton d'échange (bouton en bas, le deuxième sur la gauche) puis sur la carte que vous souhaitez déplacer."},
    5: {titre: 'Pendu', infos: 'Trouver le mot mystère en essayant différentes lettres. Attention à ne pas vous faire pendre'},
  }

  const handleCloseInfos = () => {
    setOpenInfos(false)
  }

  return (
    <>
      {openInfos &&
        <Dialog
          open={openInfos}
          onClose={handleCloseInfos}
        >
          <DialogTitle>{textInfos[mode].titre}</DialogTitle>
          <DialogContent style={{alignItems: 'center', justifyContent: 'center', display: 'flex'}}>
            {textInfos[mode].infos}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseInfos}>OK</Button>
          </DialogActions>
        </Dialog>}
    </>
  )
}

export default Informations;