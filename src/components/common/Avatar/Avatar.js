import { memo } from 'react';
import PropTypes from 'prop-types';
import User from './../../../assets/person.png';
import { addFsExcludeClass, mergeClassName } from '@/lib/utils';

const Avatar = memo(({ image, square, userName, className }) => {
  return (
    <div
      style={{ backgroundImage: `url(${User}`, backgroundPosition: 'center', backgroundSize: 'cover' }}
      className={mergeClassName(
        'w-8 h-8 overflow-hidden',
        { 'rounded-md border border-gray-200': square, 'rounded-full': !square },
        className,
      )}
    >
      {image ? (
        <img
          src={image}
          alt={userName ?? 'User'}
          className={addFsExcludeClass('object-cover w-full h-full')}
        />
      ) : null}
    </div>

  );
});

Avatar.propTypes = {
  image: PropTypes.string,
  square: PropTypes.bool,
  userName: PropTypes.string,
  className: PropTypes.string,
};

export default Avatar;
