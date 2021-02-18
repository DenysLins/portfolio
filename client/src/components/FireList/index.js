import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'
import Switch from '@material-ui/core/Switch'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'

import Fire from '../Fire/index'
import './style.css'

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
  const [checked, setChecked] = useState(false)
  const [debug, setDebug] = useState(false)
  const { t } = useTranslation()

  const fireHeight = 15
  const fireWidth = 30
  const vDecay = 10
  const hDecay = 3
  const time = 100

  const calculateFirePropagation = () => {
    const newArr = [...firePixelArray]
    for (let column = 0; column < fireWidth; column++) {
      for (let row = 0; row < fireHeight; row++) {
        const currentPixelIndex = column + fireWidth * row
        const belowPixelIndex = currentPixelIndex + fireWidth
        if (belowPixelIndex < fireHeight * fireWidth) {
          const belowPixelFireIntensity = firePixelArray[belowPixelIndex]
          const randomVDecay = Math.floor(Math.random() * vDecay)
          const randomHDecay = Math.floor(Math.random() * hDecay)
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
      const fireColor = Math.floor(
        Math.random() *
          (fireColorsPalette.length - 1 - (fireColorsPalette.length - 4)) +
          fireColorsPalette.length -
          4
      )
      newArr[pixelIndex] = fireColor
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
  })

  const toggleChecked = () => {
    setDebug((prev) => !prev)
    setChecked((prev) => !prev)
  }

  return (
    <>
      <div
        className="debug"
        style={{
          color: checked ? 'rgb(215, 103, 15)' : 'white'
        }}
      >
        <FormGroup row>
          <FormControlLabel
            control={
              <Switch
                color="default"
                checked={checked}
                onChange={toggleChecked}
              />
            }
            label={t('debug')}
            labelPlacement="start"
          />
        </FormGroup>
      </div>

      <table cellPadding={0} cellSpacing={0}>
        <tbody>
          {new Array(fireHeight).fill(0).map((row, i) => (
            <tr key={`${i}`}>
              {new Array(fireWidth).fill(0).map((column, j) => {
                const pixelIndex = j + fireWidth * i
                const fireIntensity = firePixelArray[pixelIndex]
                const color = fireIntensity
                  ? fireColorsPalette[fireIntensity]
                  : null
                return (
                  <td
                    key={`${i}${j}`}
                    style={{
                      width: props.dimensions.width / fireWidth,
                      height: props.dimensions.width / fireWidth,
                      backgroundColor: color
                        ? !debug
                          ? `rgba(${color.r},${color.g},${color.b}, 0.5)`
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
    </>
  )
}

FireList.propTypes = {
  started: PropTypes.bool,
  setStarted: PropTypes.func,
  dimensions: PropTypes.object
}

export default FireList
