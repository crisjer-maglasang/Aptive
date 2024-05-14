import { mergeClassName } from '@/lib/utils';
import PropTypes from 'prop-types';

const MapLegendIcon = ({ className }) => {
  return (
    <svg className={mergeClassName('w-6 h-6 text-gray-400', className)} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 6H21M10 12H21M10 18H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="5" cy="6" r="2" fill="currentColor" />
      <rect x="3" y="16" width="4" height="4" rx="0.75" fill="currentColor" />
      <path d="M4.55279 10.3944C4.73705 10.0259 5.26295 10.0259 5.44721 10.3944L6.6382 12.7764C6.80442 13.1088 6.56267 13.5 6.19098 13.5H3.80902C3.43733 13.5 3.19558 13.1088 3.3618 12.7764L4.55279 10.3944Z" fill="currentColor" />
    </svg>
  );
};

MapLegendIcon.propTypes = {
  className: PropTypes.string,
};

export default MapLegendIcon;
