import PropTypes from 'prop-types';
import { useEffect, useMemo, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useWatch } from 'react-hook-form';

import { CustomButton } from '@/components';
import { Select } from '@/components/common';
import { selectAreasList } from '@/redux/areas-new';

const AreaOptions = ({ createNewAreaPlan }) => {
  const areaPlans = useWatch({ name: 'area_plans' });

  const [newAreaId, setNewAreaId] = useState(null);
  const areas = useSelector(selectAreasList);

  const areaIds = useMemo(
    () => areaPlans.map(({ area_id }) => area_id),
    [areaPlans]
  );

  const areaOptions = useMemo(() => {
    const areaMap = (areas || []).map(({ area_id, area_name }) => ({
      label: area_name,
      value: area_id,
    }));

    return areaMap.filter(({ value }) => !areaIds.includes(value));
  }, [areas, areaIds]);

  useEffect(() => {
    if (areaOptions.length > 0) {
      setNewAreaId(areaOptions[0].value);
    }
  }, [areaOptions]);

  const addAreaPricing = useCallback(() => {
    if (!areaIds.includes(newAreaId)) {
      createNewAreaPlan(newAreaId);
    }
  }, [areaIds, createNewAreaPlan, newAreaId]);

  return (
    <div>
      <div className="w-64">
        <Select
          name={'areaNames'}
          onChange={({ target: { value } }) => setNewAreaId(value)}
          value={newAreaId}
          options={areaOptions}
        />
      </div>
      <div>
        <CustomButton onClick={addAreaPricing}>
          Add Custom Area Pricing
        </CustomButton>
      </div>
    </div>
  );
};

AreaOptions.propTypes = {
  createNewAreaPlan: PropTypes.func.isRequired,
};

export default AreaOptions;
