import { useMemo, memo } from 'react';
import classNames from 'classnames';

import {
  UsersIcon,
  ExternalLinkIcon,
  PencilAltIcon,
  UserGroupIcon,
  UserAddIcon,
  UserIcon,
  BadgeCheckIcon,
  CheckCircleIcon as CheckCircleOutline,
} from '@heroicons/react/outline';

import { dataKeys } from '@/lib/adapters';

const {
  USERS_GROUP_ICON,
  USER_ADD_ICON,
  PENCIL_ICON,
  USER_ICON,
  CHECK_CIRCLE_ICON,
  USERS_ICON,
  LINK_ICON,
  BADGE_ICON,
} = dataKeys;

const StatsHeaderItem = (
  {
    title,
    dataItem,
    iconName,
    onClick,
    selected,
    iconClassNames,
    itemName,
    filterOptions,
    disabled
  }) => {
  const iconClasses = useMemo(() => classNames(
    iconClassNames,
    'h-6 w-6 mx-auto my-2',
  ), [iconClassNames]);

  const iconsMap = {
    [USERS_GROUP_ICON]: <UserGroupIcon className={iconClasses} aria-hidden="true" />,
    [USER_ADD_ICON]: <UserAddIcon className={iconClasses} aria-hidden="true" />,
    [PENCIL_ICON]: <PencilAltIcon className={iconClasses} aria-hidden="true" />,
    [USER_ICON]: <UserIcon className={iconClasses} aria-hidden="true" />,
    [CHECK_CIRCLE_ICON]: <CheckCircleOutline className={iconClasses} aria-hidden="true" />,
    [USERS_ICON]: <UsersIcon className={iconClasses} aria-hidden="true" />,
    [LINK_ICON]: <ExternalLinkIcon className={iconClasses} aria-hidden="true" />,
    [BADGE_ICON]: <BadgeCheckIcon className={iconClasses} aria-hidden="true" />,
  };

  const icon = useMemo(() => {
    return iconsMap[iconName]
  }, [iconName]);

  const wrapperClasses = useMemo(() => classNames(
      'flex flex-col border-b border-gray-100 p-6 text-center sm:border-0 sm:border-r hover:bg-gray-200 cursor-pointer',
      { 'bg-gray-200': selected === itemName },
      { 'pointer-events-none opacity-30': disabled }
    ),
    [selected, itemName, disabled]
  );

  return (
    <div
      className={wrapperClasses}
      onClick={() => onClick(itemName, filterOptions)}
    >
      <dt className="order-2 mt-2 text-3xl leading-6 font-extrabold text-gray-900 mx-auto my-2">
        {dataItem}
      </dt>
      <dd className="order-1 text-sm justify-center text-aptivegreen font-medium">
        {icon}
        {title}
      </dd>
    </div>
  );
};

export default memo(StatsHeaderItem);
