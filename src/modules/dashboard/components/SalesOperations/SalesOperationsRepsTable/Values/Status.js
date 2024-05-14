import { mergeClassName } from '@/lib';
import PropTypes from 'prop-types';
import { isUndefined } from 'lodash-es';
import { iconMap } from '@/components/common/Icon';

const Status = ({
  text,
  isIcon,
  isCompleted,
}) => {
  const getClassName = () => mergeClassName(
    { 'bg-red-100 text-red-800': !isCompleted },
    { 'bg-green-100 text-green-800': isCompleted },
  );

  return (
    <div
      className={
        mergeClassName(
          'inline-flex items-center gap-x-1 px-2.5 py-0.5 rounded-md text-xs text-gray-900 font-medium bg-gray-100',
          !isUndefined(isCompleted) ? getClassName() : '',
        )
      }
    >
      {isIcon && (
        <span className="w-3.5 h-3.5">
          {isCompleted ? iconMap.check : iconMap.times}
        </span>
      )}
      {text ? <span>{text}</span> : null}
    </div>
  );
};

Status.defaultProps = {
  isIcon: false,
};

Status.propTypes = {
  text: PropTypes.string,
  isIcon: PropTypes.bool,
  isCompleted: PropTypes.bool,
};

export default Status;
