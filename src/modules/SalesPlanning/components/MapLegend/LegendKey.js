import { memo } from 'react';
import PropTypes from 'prop-types';

const LegendKey = ({ image, style, name }) => {
  return (
    <div className="grow-0 shrink basis-[21%] pr-2">
      <div className="flex flex-nowrap justify-start items-center gap-x-2">
        {image
          ? <img className="w-3.5 h-3.5" src={image} alt={name} />
          : <div className="w-2 h-2 rounded-full" style={style} />}
        <span className="text-[10px] text-gray-700 capitalize whitespace-nowrap">{name}</span>
      </div>
    </div>
  );
};

LegendKey.propTypes = {
  image: PropTypes.string,
  style: PropTypes.object,
  name: PropTypes.string,
};

export default memo(LegendKey);
