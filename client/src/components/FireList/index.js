import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Switch from '@material-ui/core/Switch'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { withStyles } from '@material-ui/core/styles'
import { orange } from '@material-ui/core/colors'
import './style.css'
import Fire from '../Fire/index'

const fireColorsPalette = [
  { r: 7, g: 7, b: 7 },
  { r: 31, g: 7, b: 7 },
  { r: 47, g: 15, b: 7 },
  { r: 71, g: 15, b: 7 },
  { r: 87, g: 23, b: 7 },
  { r: 103, g: 31, b: 7 },
  { r: 119, g: 31, b: 7 },
  { r: 143, g: 39, b: 7 },
  { r: 159, g: 47, b: 7 },
  { r: 175, g: 63, b: 7 },
  { r: 191, g: 71, b: 7 },
  { r: 199, g: 71, b: 7 },
  { r: 223, g: 79, b: 7 },
  { r: 223, g: 87, b: 7 },
  { r: 223, g: 87, b: 7 },
  { r: 215, g: 95, b: 7 },
  { r: 215, g: 95, b: 7 },
  { r: 215, g: 103, b: 15 },
  { r: 207, g: 111, b: 15 },
  { r: 207, g: 119, b: 15 },
  { r: 207, g: 127, b: 15 },
  { r: 207, g: 135, b: 23 },
  { r: 199, g: 135, b: 23 },
  { r: 199, g: 143, b: 23 },
  { r: 199, g: 151, b: 31 },
  { r: 191, g: 159, b: 31 },
  { r: 191, g: 159, b: 31 },
  { r: 191, g: 167, b: 39 },
  { r: 191, g: 167, b: 39 },
  { r: 191, g: 175, b: 47 },
  { r: 183, g: 175, b: 47 },
  { r: 183, g: 183, b: 47 },
  { r: 183, g: 183, b: 55 },
  { r: 207, g: 207, b: 111 },
  { r: 223, g: 223, b: 159 },
  { r: 239, g: 239, b: 199 },
  { r: 255, g: 255, b: 255 }
]

const FireList = (props) => {
  const [firePixelArray, setFirePixelArray] = useState([])
  const [fireWidth, setfireWidth] = useState(40)
  const [fireHeight, setfireHeight] = useState(20)
  const [vdecay, setVDecay] = useState(6)
  const [hdecay, setHDecay] = useState(4)
  const [time, setTime] = useState(200)
  const [debug, setDebug] = useState(false)
  const [checked, setChecked] = useState(false)

  const calculateFirePropagation = () => {
    const newArr = [...firePixelArray]
    for (let column = 0; column < fireWidth; column++) {
      for (let row = 0; row < fireHeight; row++) {
        const currentPixelIndex = column + fireWidth * row
        const belowPixelIndex = currentPixelIndex + fireWidth
        if (belowPixelIndex < fireHeight * fireWidth) {
          const belowPixelFireIntensity = firePixelArray[belowPixelIndex]
          const randomVDecay = Math.floor(Math.random() * vdecay)
          const randomHDecay = Math.floor(Math.random() * hdecay)
          const calculatedFireIntensity =
            belowPixelFireIntensity - randomVDecay
          const newFireIntensity =
            calculatedFireIntensity > 0 ? calculatedFireIntensity : 0
          newArr[currentPixelIndex - randomHDecay] = newFireIntensity
        }
      }
    }
    setFirePixelArray(newArr)
  }

  const createFireDataStructure = () => {
    const numberOfPixels = fireHeight * fireWidth
    const newArr = new Array(numberOfPixels).fill(0)
    for (let column = 0; column < fireWidth; column++) {
      const pixelIndex = numberOfPixels - fireWidth + column
      newArr[pixelIndex] = fireColorsPalette.length - 1
    }
    setFirePixelArray(newArr)
  }

  useEffect(() => {
    if (!props.started) {
      createFireDataStructure()
      props.setStarted(true)
    }
    const interval = setInterval(() => calculateFirePropagation(), time)
    return () => clearInterval(interval)
  }, [calculateFirePropagation])

  const CustomSwitch = withStyles({
    switchBase: {
      color: orange[100],
      '&$checked': {
        color: orange[700]
      },
      '&$checked + $track': {
        backgroundColor: orange[700]
      }
    },
    checked: {},
    track: {}
  })(Switch)

  const toggleChecked = () => {
    setDebug((prev) => !prev)
    setChecked((prev) => !prev)
  }

  return (
    <>
      <span className="name">Denys Lins</span>
      <table cellPadding={0} cellSpacing={0}>
        <tbody>
          {new Array(fireHeight).fill(0).map((row, i) => (
            <tr key={`${i}`}>
              {new Array(fireWidth).fill(0).map((column, j) => {
                const pixelIndex = j + fireWidth * i
                const fireIntensity = firePixelArray[pixelIndex]
                let color = null
                if (fireIntensity) {
                  color = fireColorsPalette[fireIntensity]
                }
                return (
                  <td
                    key={`${i}${j}`}
                    style={{
                      width: window.innerWidth / fireWidth,
                      height: window.innerHeight / fireHeight,
                      backgroundColor: color
                        ? !debug
                          ? `rgba(${color.r},${color.g},${color.b}, 0.7)`
                          : 'rgb(255,255,255)'
                        : !debug
                          ? 'rgb(0,0,0)'
                          : 'rgb(255,255,255)'
                    }}
                  >
                    <Fire
                      debug={debug}
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
      <FormGroup className="debug">
        <FormControlLabel
          control={<CustomSwitch checked={checked} onChange={toggleChecked} />}
          label="Debug"
          labelPlacement="start"
        />
      </FormGroup>
    </>
  )
}

FireList.propTypes = {
  started: PropTypes.bool,
  setStarted: PropTypes.func
}

export default FireList
