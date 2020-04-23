import React, { useState } from 'react'
import './style.css'
import FireList from '../FireList'

const App = () => {
  const [started, setStarted] = useState(false)
  return (
    <div className="App">
      <h1>Denys</h1>
      <FireList started={started} setStarted={setStarted} />
    </div>
  )
}

export default App
