import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Memory from './Memory'
import MyAppBar from './AppBar'

function App() {

  const [mode, setMode] = useState(0)
  const [startNewGame, setStartNewGame] = useState(true);

  return (
    <>
      <MyAppBar setMode={setMode} setStartNewGame={setStartNewGame} />
      <Memory mode={mode} startNewGame={startNewGame} setStartNewGame={setStartNewGame} />
    </>
  )
}

export default App
