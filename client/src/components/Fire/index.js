import React from 'react'
import PropTypes from 'prop-types'
import './style.css'

const Fire = (props) => (
  <>
    <div className="pixel-index">{props.debug && props.pixelIndex}</div>
    {props.debug && props.fireIntensity}
  </>
)

Fire.propTypes = {
  pixelIndex: PropTypes.number,
  fireIntensity: PropTypes.number,
  debug: PropTypes.bool
}

export default Fire
