/**
 *
 * Img.js
 *
 * Renders an image, enforcing the usage of the alt="" tag
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function Img(props) {
  const [imageSrc, setImageSrc] = useState(props.src);

  useEffect(() => {
    setImageSrc(props.src);
  }, [props.src]);

  const onEventHandler = e => {
    console.error('image 404: ', e);

    if(props.fallbackImageSrc) {
      setImageSrc(props.fallbackImageSrc);
    }
  };

  return <img className={props.className} src={imageSrc} alt={props.alt} onError={onEventHandler} />;
}

// We require the use of src and alt, only enforced by react in dev mode
Img.propTypes = {
  src: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default Img;
