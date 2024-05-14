import { mergeClassName } from '@/lib/utils';
import PropTypes from 'prop-types';

const TwitterIcon = ({ className }) => (
  <svg className={mergeClassName('w-6 h-6', className)} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path
      style={{
        fillRule: 'nonzero',
        fill: 'currentColor',
        fillOpacity: 1,
        strokeWidth: 1,
        strokeLinecap: 'butt',
        strokeLinejoin: 'miter',
        stroke: 'rgb(100%,100%,100%)',
        strokeOpacity: 1,
        strokeMiterlimit: 10,
        clipRule: 'nonzero',
      }}
      d="M 1315.545355 610.6 C 1315.545355 876.359359 1100.039359 1091.865355 834.28 1091.865355 C 568.520641 1091.865355 353.014645 876.359359 353.014645 610.6 C 353.014645 344.840641 568.520641 129.334645 834.28 129.334645 C 1100.039359 129.334645 1315.545355 344.840641 1315.545355 610.6 Z M 1315.545355 610.6 "
      transform="matrix(0.0207542,0,0,0.0207542,-5.314821,-0.672519)"
    />
    <path
      style={{
        stroke: 'none',
        fillRule: 'nonzero',
        fill: 'rgb(100%,100%,100%)',
        fillOpacity: 1,
        clipRule: 'nonzero',
      }}
      d="M 3.847656 4.210938 L 8.621094 10.597656 L 3.816406 15.789062 L 4.898438 15.789062 L 9.105469 11.242188 L 12.503906 15.789062 L 16.183594 15.789062 L 11.140625 9.042969 L 15.613281 4.210938 L 14.53125 4.210938 L 10.65625 8.398438 L 7.527344 4.210938 Z M 5.4375 5.007812 L 7.128906 5.007812 L 14.59375 14.992188 L 12.902344 14.992188 Z M 5.4375 5.007812 "
      transform="translate(2 2)"
    />
  </svg>
);

TwitterIcon.propTypes = {
  className: PropTypes.string,
};

export default TwitterIcon;
