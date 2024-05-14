import PropTypes from 'prop-types';
import { mergeClassName } from '@/lib/utils';

const MapLegendItem = ({ isDivider, title, children }) => {
  return (
    <div className={mergeClassName({ 'border-b mb-2': isDivider })}>
      <p className="font-sm capitalize text-gray-900">{title}</p>
      <div className="flex justify-start items-center py-3 flex-wrap gap-x-4 gap-y-1.5">
        {children}
      </div>
    </div>
  );
};

MapLegendItem.defaultProps = {
  isDivider: false,
};

MapLegendItem.propTypes = {
  isDivider: PropTypes.bool,
  title: PropTypes.string,
  children: PropTypes.node,
};

export default MapLegendItem;
