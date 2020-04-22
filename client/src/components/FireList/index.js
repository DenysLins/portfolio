import React, { useState, useEffect } from 'react'
import './style.css'
import Fire from '../Fire/index'

const FireList = () => {
  const [firePixelArray, setFirePixelArray] = useState([])
  const [fireWidth, setfireWidth] = useState(10)
  const [fireHeight, setfireHeight] = useState(10)
  const calculateFirePropagation = () => {}

  useEffect(() => {
    const numberOfPixels = fireHeight * fireWidth
    setFirePixelArray(new Array(numberOfPixels).fill(0))
  }, [fireHeight, fireWidth])

  console.log('FireList')

  return (
    <div className="FireList">
      <table cellPadding={0} cellSpacing={0}>
        <tbody>
          {new Array(fireHeight).fill(0).map((row, i) => (
            <tr key={`${i}`}>
              {new Array(fireWidth).fill(0).map((column, j) => {
                const pixelIndex = j + fireWidth * i
                const fireIntensity = firePixelArray[pixelIndex]
                return (
                  <td key={`${i}${j}`}>
                    <Fire
                      pixelIndex={pixelIndex}
                      fireIntensity={fireIntensity}
                    />
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default FireList
