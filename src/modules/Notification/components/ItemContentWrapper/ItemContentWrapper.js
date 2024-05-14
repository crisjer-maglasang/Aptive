import { memo, useMemo } from 'react';
import PropTypes from 'prop-types';
import { mergeClassName } from '@/lib/utils';
import { getTimeSinceToDisplay } from '@/modules/Notification/lib';

const ItemContentWrapper = ({ icon: Icon, isRead, children, date, isDivider, onClick }) => {
  const timeSince = useMemo(() => getTimeSinceToDisplay(date), [date]);

  return (
    <button
      type="button"
      className={mergeClassName(
        'p-4 hover:bg-zinc-50 transition-color duration-300 focus:bg-gray-100 focus:outline-0 focus:ring-0',
        { 'border-b': isDivider, 'opacity-60': isRead },
      )}
      onClick={onClick}
    >
      <div className="flex flex-nowrap items-start justify-between gap-x-3.5">
        <div className="w-10">
          <div className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-400">
            <Icon
              className={mergeClassName(
                'w-6 h-6 stroke-gray-800',
                { 'stroke-gray-400': isRead },
              )}
            />
          </div>
        </div>
        <div className="grow text-sm font-medium text-gray-500 text-left mb-1">
          {children}
          {date ? <p className="font-normal mt-2">{timeSince}</p> : null}
        </div>
      </div>
    </button>
  );
};

ItemContentWrapper.propTypes = {
  icon: PropTypes.object,
  isRead: PropTypes.bool,
  children: PropTypes.node,
  date: PropTypes.string,
  isDivider: PropTypes.bool,
  onClick: PropTypes.func,
};

export default memo(ItemContentWrapper);
