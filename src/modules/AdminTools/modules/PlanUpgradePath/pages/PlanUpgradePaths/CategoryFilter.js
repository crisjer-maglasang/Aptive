import { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import { Select } from '@/components/common';
import { planCategoriesSelector } from '@/modules/AdminTools/redux/planBuilder/can-edit-settings/plan-categories';
import { plansSelector } from '@/modules/AdminTools/redux/planBuilder/plans';

const useCategoryFilter = (data) => {
  const plans = useSelector(plansSelector);
  const [searchParams, setSearchParams] = useSearchParams();
  const categories = useSelector(planCategoriesSelector);
  const options = useMemo(() => {
    return categories.map(({ id, name }) => ({
      label: name,
      value: id,
    }));
  }, [categories]);

  const category = useMemo(() => {
    if (searchParams.get('category')) {
      return +searchParams.get('category');
    }
  }, [searchParams]);

  useEffect(() => {
    if (!categories.length) {
      return;
    }
    if (searchParams.get('category') === null) {
      setSearch('category', categories[0]);
    }
  }, [categories, searchParams]);

  const setSearch = (search) => {
    searchParams.set('category', search);
    setSearchParams(searchParams);
  };

  const filteredData = useMemo(() => {
    return data.filter((obj) => {
      const planCategoryId = categories.map(({ id }) => id);
      if (category && planCategoryId.length) {
        const plansInObj = [obj.upgrade_from_plan_id, obj.upgrade_to_plan_id];

        return plans.some(
          ({ id, plan_category_ids }) =>
            plansInObj.includes(id) &&
            plan_category_ids.some((id) => id == category)
        );
      }

      return false;
    });
  }, [categories, category, data, plans]);

  useEffect(() => {
    if (!category && categories.length) {
      setSearch(categories[0].id);
    }
  });

  return {
    filteredData,
    Filter: () => (
      <div className="flex flex-col">
        <label>Filter By Category</label>
        <Select
          name="categories"
          onChange={({ target: { value } }) => setSearch(value)}
          value={category}
          {...{ options }}
        />
      </div>
    ),
  };
};

export default useCategoryFilter;
