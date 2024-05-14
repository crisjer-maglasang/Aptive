import { memo } from 'react';
import PropTypes from 'prop-types';
import { Popup } from 'react-leaflet';
import { sptConstants } from '../../../../lib';

const { QUALIFIED_ADDRESSES, WEEKS_SINCE_KNOCKED, PIN_SCORE, NONE } = sptConstants;

const HeatMapCellDetails = ({ qualifiedAddresses, weeksSinceKnocked, pinsScore }) => {
  const cellDetails = [
    { label: QUALIFIED_ADDRESSES, value: qualifiedAddresses },
    { label: WEEKS_SINCE_KNOCKED, value: weeksSinceKnocked },
    { label: PIN_SCORE, value: pinsScore },
    { label: NONE, value: {} },
  ];

  return (
    <Popup>
      <ul>
        {cellDetails.map(({ label, value }) => (
          <li key={label} className="flex items-center justify-between gap-x-4 border-b last:border-none">
            <p className="text-sm text-gray-500">
              {label}
            </p>
            <span className="text-sm">
              {value ?? 0}
            </span>
          </li>
        ))}
      </ul>
    </Popup>
  );
};

HeatMapCellDetails.propTypes = {
  qualifiedAddresses: PropTypes.number,
  weeksSinceKnocked: PropTypes.number,
  pinsScore: PropTypes.number,
};

export default memo(HeatMapCellDetails);
