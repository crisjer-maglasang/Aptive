import PropTypes from 'prop-types';
import { useCallback, useMemo } from 'react';
import { useWatch } from 'react-hook-form';
import { useSelector } from 'react-redux';

import { Select } from '@/components/common';
import { selectAreasList } from '@/redux/areas-new';

const AreaPlanOptions = ({ areaIndex, setAreaIndex }) => {
  const areaPlans = useWatch({ name: 'area_plans' });

  const areas = useSelector(selectAreasList);

  const getAreaName = useCallback(
    (area_id) => {
      if (!areas) {
        return '';
      }
      for (let i = 0; i < areas.length; i++) {
        if (+areas[i].area_id === +area_id) {
          return areas[i].area_name;
        }
      }

      return '';
    },
    [areas]
  );

  const areaPlanRows = useMemo(() => {
    let options = [];
    options = areaPlans.map(({ area_id }, index) => ({
      label: getAreaName(area_id),
      value: index,
    }));

    return options;
  }, [areaPlans, getAreaName]);

  const showSelect = !!areaPlans.length;

  if (!showSelect) {
    return null;
  }

  return (
    <>
      <div className="flex flex-col mt-4">
        <div>Select An Area</div>
        <div className="w-64">
          <Select
            name={'areaNames'}
            options={areaPlanRows}
            onChange={({ target: { value } }) => setAreaIndex(value)}
            value={areaIndex}
          />
        </div>
      </div>
      <hr className="mt-4" />
    </>
  );
};

AreaPlanOptions.propTypes = {
  areaIndex: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  setAreaIndex: PropTypes.func.isRequired,
};

export default AreaPlanOptions;
