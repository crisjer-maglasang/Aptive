import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

const ImageSize = ({ src }) => {
  const [size, setSize] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setSize(() => ({
        width: Math.round(img.width),
        height: Math.round(img.height),
      }));
    };
  }, [src]);

  return <div>{`${size.width}px x ${size.height}px`}</div>;
};

ImageSize.propTypes = {
  src: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

export default ImageSize;
