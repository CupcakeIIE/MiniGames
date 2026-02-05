import { useState } from 'react'

import './App.css'
import Memory from './Memory'
import MyAppBar from './AppBar'

function App() {

  const [mode, setMode] = useState(0)
  const [theme, setTheme] = useState('lol')
  const [startNewGame, setStartNewGame] = useState(true);

  return (
    <>
      <MyAppBar setMode={setMode} setStartNewGame={setStartNewGame} theme={theme} setTheme={setTheme} />
      <Memory mode={mode} startNewGame={startNewGame} setStartNewGame={setStartNewGame} theme={theme} />
    </>
  )
}

export default App
