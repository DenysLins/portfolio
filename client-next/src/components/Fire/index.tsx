import React from "react";
import PropTypes from "prop-types";

import style from "../../styles/Fire.module.css";

const Fire = (props) => {
  return (
    <>
      <div className={style.pixel_index}>{
        props.debug && props.pixelIndex}
      </div>
      <div className={style.fire_intensity}>
        {props.debug && props.fireIntensity}
      </div>
    </>
  )

};

Fire.propTypes = {
  pixelIndex: PropTypes.number,
  fireIntensity: PropTypes.number,
  debug: PropTypes.bool,
};

export default Fire;
