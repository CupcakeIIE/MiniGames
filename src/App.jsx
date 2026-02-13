import { useState } from 'react'

import './App.css'
import Memory from './Memory'
import MyAppBar from './AppBar'
import Pendu from './Pendu'
import Welcome from './Welcome'
import Informations from './Informations'

function App() {

  const [mode, setMode] = useState('')
  const [theme, setTheme] = useState('')
  const [startNewGame, setStartNewGame] = useState(true);
  const [game, setGame] = useState('')
  const [openInfos, setOpenInfos] = useState(false);

  // console.log('theme + mode', theme, mode)

  return (
    <>
      <MyAppBar mode={mode} setMode={setMode} setStartNewGame={setStartNewGame} theme={theme} setTheme={setTheme} setGame={setGame} />
      {theme === "" || game === ""
       ? <Welcome />
       : <>
          {game === 'memory'
            ? <Memory mode={mode} startNewGame={startNewGame} setStartNewGame={setStartNewGame} theme={theme} setOpenInfos={setOpenInfos} />
            : <Pendu startNewGame={startNewGame} setStartNewGame={setStartNewGame} theme={theme} setOpenInfos={setOpenInfos} />
          }
        </>
      }
      {openInfos &&
        <Informations openInfos={openInfos} setOpenInfos={setOpenInfos} mode={mode} />}
    </>
  )
}

export default App
