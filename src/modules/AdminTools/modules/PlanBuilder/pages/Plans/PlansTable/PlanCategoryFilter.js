import { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

import { Select } from '@/components/common';
import { planBuilderConstants } from '@/modules/AdminTools/lib/constants';

import { settingsSelector } from '@/modules/AdminTools/redux/planBuilder/settings';

const { PLAN_CATEGORIES, PLAN_CATEGORIES_LABEL } = planBuilderConstants;

const usePlanCategoryFilter = ({ plans }) => {
  const {
    options: { plan_categories },
  } = useSelector(settingsSelector);

  const [filterCategories, setFilterCategories] = useState([]);

  const filteredData = useMemo(() => {
    if (filterCategories.length > 0) {
      return plans.filter(({ plan_category_ids }) =>
        filterCategories.every((categoryId) =>
          plan_category_ids.includes(categoryId)
        )
      );
    }

    return plans;
  }, [filterCategories, plans]);

  return {
    filteredData,
    PlanCategoryFilter: (
      <div className="mt-0.5 block rounded-md">
        <Select
          name={PLAN_CATEGORIES}
          value={filterCategories}
          onChange={({ target: { value } }) => {
            setFilterCategories(value);
          }}
          options={plan_categories}
          isMulti={true}
          closeMenuOnSelect={false}
          placeholder={`Select ${PLAN_CATEGORIES_LABEL}`}
        />
      </div>
    ),
  };
};

export default usePlanCategoryFilter;
