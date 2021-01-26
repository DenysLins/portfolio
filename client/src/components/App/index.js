import React, { useState } from 'react'
import './style.css'
import FireList from '../FireList'

const App = () => {
  const [started, setStarted] = useState(false)
  return (
    <>
      <span className="common name">Denys Lins</span>
      <span className="common title">Software Developer</span>
      <FireList started={started} setStarted={setStarted} />
    </>
  )
}

export default App
