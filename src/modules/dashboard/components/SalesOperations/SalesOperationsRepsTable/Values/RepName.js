import { mergeClassName } from '@/lib';
import PropTypes from 'prop-types';
import { memo } from 'react';

const RepName = ({
  text,
  onClick,
  userId,
}) => {
  const className = 'text-primary-300 font-medium';

  return onClick && userId ?
    (
      <button
        className={mergeClassName(className, 'text-left cursor-pointer focus:outline-none')}
        onClick={() => onClick(userId)}
      >
        {text}
      </button>
    )
    : (
      <span className={className}>
        {text}
      </span>
    );
};

RepName.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  userId: PropTypes.number,
};

export default memo(RepName);
