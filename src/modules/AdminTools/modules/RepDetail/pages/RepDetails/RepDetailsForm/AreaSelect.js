import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Controller } from 'react-hook-form';

import { Select } from '@/components/common';
import { planBuilderConstants } from '@/modules/AdminTools/lib/constants';

import { selectAreasList } from '@/redux/areas-new';

const { AREA_LABEL, AREA } = planBuilderConstants;

const AreaSelect = () => {
  const areas = useSelector(selectAreasList);

  const options = useMemo(() => {
    const options = [
      {
        label: 'Default',
        value: '',
      },
    ];

    if (!areas) {
      return options;
    }

    options.push(
      ...areas.map(({ area_id, area_name }) => ({
        label: area_name,
        value: area_id,
      }))
    );

    return options;
  }, [areas]);

  return (
    <div className="flex flex-col w-64">
      <div className="flex items-center">
        <div className="flex text-sm font-medium text-gray-700">
          <label>{AREA_LABEL}</label>
        </div>
      </div>
      <div className="mt-0.5 block rounded-md shadow-sm">
        <Controller
          name={AREA}
          render={({ field: { onChange, value, name } }) => (
            <Select
              {...{
                name,
                onChange,
                value,
                options,
              }}
            />
          )}
        />
      </div>
    </div>
  );
};

export default AreaSelect;
