import { memo } from 'react';

import { StatsHeaderItem } from './StatsHeaderItem';

const StatsHeader = ({
  constants,
  data,
  onTileClick,
  selected,
  isDisabled,
}) => {
  return (
    <div className="flex flex-col overflow-hidden rounded-lg">
      <div className="bg-white shadow-l md:grid md:grid-flow-col">
        {constants?.map((item) => {
          return (
            <StatsHeaderItem
              key={item?.name}
              title={item?.title}
              dataItem={data[item.name]}
              iconName={item?.iconName}
              onClick={onTileClick}
              itemName={item?.name}
              selected={selected}
              filterOptions={item?.filterOptions}
              disabled={isDisabled}
            />
          );
        })}
      </div>
    </div>
  );
};

export default memo(StatsHeader);
