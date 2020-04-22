import React from 'react'
import PropTypes from 'prop-types'
import './style.css'

const Fire = (props) => {
  console.log('Fire')

  return (
    <div className="Fire">
      <div className="pixel-index">{props.pixelIndex}</div>
      {props.fireIntensity}
    </div>
  )
}

Fire.propTypes = {
  pixelIndex: PropTypes.number,
  fireIntensity: PropTypes.number
}

export default Fire
