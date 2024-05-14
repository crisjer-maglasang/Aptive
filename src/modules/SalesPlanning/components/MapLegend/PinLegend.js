import { memo } from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import { sptConstants } from '@/modules/SalesPlanning/lib';
import { getOutcomePinIcon } from '@/modules/SalesPlanning/lib/helpers/getPinIcon';
import '../../assets/tooltip-custom.css';

const PinLegend = ({ name, item }) => {
  return (
    <div className="grow-0 shrink basis-[21%]">
      <div className="flex flex-nowrap justify-start items-center gap-x-2" data-for={name} data-tip>
        <img
          className="h-6 mr-1"
          src={getOutcomePinIcon({ fill: item.fill, stroke: item.stroke })}
          alt={item.color}
        />
        <span className="text-[10px] text-gray-700 capitalize whitespace-nowrap">{name}</span>
      </div>
      <ReactTooltip
        id={name}
        place="top"
        className="shadow-lg opacity-25"
        backgroundColor="white"
        arrowColor="white"
      >
        <span className="text-black font-bold text-base">{name}</span>
        <div className="flex justify-start py-2 gap-x-3">
          {sptConstants.OUTCOME_PIN_TYPES.map((pin) => (
            <div key={pin.name} className="flex shrink justify-start items-center pr-1">
              <img
                className="w-6 h-6 mr-1"
                src={getOutcomePinIcon({ type: pin.type, hasNote: pin.hasNote, fill: item.fill, stroke: item.stroke, color: pin?.color })}
                alt={pin.name}
              />
              <span className="text-[10px] text-gray-700 capitalize whitespace-nowrap">{pin.name}</span>
            </div>
          ))}
        </div>
      </ReactTooltip>
    </div>
  );
};

PinLegend.propTypes = {
  style: PropTypes.object,
  name: PropTypes.string,
  item: PropTypes.object,
};

export default memo(PinLegend);
