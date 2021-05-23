import React from "react";
import PropTypes from "prop-types";

import style from "../../styles/FireList.module.css";

const Fire = (props) => {
  return (
    <>
      <div className={style.pixel_index}>{
        props.debug && props.pixelIndex}
      </div>
      {props.debug && props.fireIntensity}
    </>
  )

};

Fire.propTypes = {
  pixelIndex: PropTypes.number,
  fireIntensity: PropTypes.number,
  debug: PropTypes.bool,
};

export default Fire;
