import { useState } from 'react'

import './App.css'
import Memory from './Memory'
import MyAppBar from './AppBar'
import Pendu from './Pendu'

function App() {

  const [mode, setMode] = useState(0)
  const [theme, setTheme] = useState('lol')
  const [startNewGame, setStartNewGame] = useState(true);
  const [game, setGame] = useState('memory')

  return (
    <>
      <MyAppBar setMode={setMode} setStartNewGame={setStartNewGame} theme={theme} setTheme={setTheme} setGame={setGame} />
      {game === 'memory'
        ? <Memory mode={mode} startNewGame={startNewGame} setStartNewGame={setStartNewGame} theme={theme} />
        : <Pendu startNewGame={startNewGame} setStartNewGame={setStartNewGame} theme={theme} />
      }
    </>
  )
}

export default App
