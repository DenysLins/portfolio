import React, { useState, useEffect } from 'react'
import './style.css'

function Fire () {
  const [firePixelArray, setFirePixelArray] = useState([])
  const [fireWidth, setfireWidth] = useState(4)
  const [fireHeight, setfireHeight] = useState(3)
  const createFireDateStructure = () => {
    const numberOfPixels = fireHeight * fireWidth
    setFirePixelArray([...firePixelArray, new Array(numberOfPixels).fill(0)])
  }
  const calculateFirePropagation = () => {}
  const renderFire = () => {}

  useEffect(() => {
    createFireDateStructure()
  }, [])

  return (
    <div className="Fire">
      <table cellPadding={0} cellSpacing={0}>
        {new Array(fireHeight).fill(0).map((row, i) => {
          return (
            <tr key={i}>
              {new Array(fireWidth).fill(0).map((column, j) => {
                const pixelIndex = j + fireWidth * i
                return <td key={j}>{pixelIndex}</td>
              })}
            </tr>
          )
        })}
      </table>
    </div>
  )
}

export default Fire
