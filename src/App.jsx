import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Memory from './Memory'
import MyAppBar from './AppBar'

function App() {

  const [mode, setMode] = useState(0)

  console.log('mode', mode)

  return (
    <>
      <MyAppBar setMode={setMode} />
      <Memory />
    </>
  )
}

export default App
