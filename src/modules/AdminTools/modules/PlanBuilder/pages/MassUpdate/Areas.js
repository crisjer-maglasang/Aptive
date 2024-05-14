import { useSelector } from 'react-redux';
import { Fragment, useCallback, useEffect, useMemo, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { selectAreasList } from '@/redux/areas-new';
import { CustomButton, Select } from '@/components/common';
import { areaPlansArraySelector } from '@/modules/AdminTools/redux/planBuilder/area-plans';
import { plansSelector } from '@/modules/AdminTools/redux/planBuilder/plans';

const toOptions = (arr) => {
  const defaultValue = { label: 'Default', value: '' };

  const options = arr.map(({ area_id, area_name }) => ({
    label: `${area_id} - ${area_name}`,
    value: area_id,
  }));

  return [defaultValue, ...options];
};

const difference = (set1, set2) =>
  new Set([...set1].filter((x) => !set2.has(x)));

const Areas = () => {
  const [existingAreaOptions, setExistingAreaOptions] = useState([]);
  const [newAreaOptions, setNewAreaOptions] = useState([]);
  const [existingAreaIds, setExistingAreaIds] = useState([]);
  const [newAreaIds, setNewAreaIds] = useState([]);
  const [areaIds, setAreaIds] = useState([]);

  const areas = useSelector(selectAreasList);
  const plans = useSelector(plansSelector);

  const planNames = useMemo(() => {
    const map = new Map();

    plans.forEach(({ name, id }) => map.set(id, name));

    return map;
  }, [plans]);

  const areaOptions = useMemo(() => {
    const map = new Map();

    toOptions(areas).forEach((option) => map.set(option.value, option));

    return map;
  }, [areas]);

  const getOptions = useCallback(
    (areaIds) =>
      areaIds.map(
        (areaId) =>
          areaOptions.get(areaId ?? '') ?? {
            label: `${areaId} - unnamed`,
            value: areaId,
          }
      ),
    [areaOptions]
  );

  const areaPlans = useSelector(areaPlansArraySelector);

  const areasByPlan = useMemo(() => {
    const map = new Map();

    areaPlans.forEach((areaPlan) => {
      if (map.has(areaPlan.plan_id)) {
        map.get(areaPlan.plan_id).push(areaPlan.area_id);
      } else {
        map.set(areaPlan.plan_id, [areaPlan.area_id]);
      }
    });

    return map;
  }, [areaPlans]);

  const planIds = useWatch({ name: 'plan_ids' });
  useEffect(() => {
    if (planIds === undefined) {
      setExistingAreaOptions([]);
      setNewAreaOptions([]);

      return;
    }

    const partitioned = Array.from(areasByPlan.entries()).reduce(
      (result, [planId, areaIds]) => {
        result[planIds.includes(planId) ? 0 : 1].addAll(...areaIds);

        return result;
      },
      [new Set(), new Set()]
    );
    partitioned[1] = difference(partitioned[1], partitioned[0]);
    setExistingAreaOptions(getOptions(Array.from(partitioned[0])));
    setNewAreaOptions(getOptions(Array.from(partitioned[1])));
  }, [areasByPlan, planIds, getOptions]);

  const allExistingAreas = useMemo(
    () => existingAreaOptions.map(({ value }) => value),
    [existingAreaOptions]
  );
  const allNewAreas = useMemo(
    () => newAreaOptions.map(({ value }) => value),
    [newAreaOptions]
  );

  const { setValue } = useFormContext();

  const addAll = useCallback(() => {
    setNewAreaIds(allNewAreas);
    setExistingAreaIds(allExistingAreas);
  }, [allExistingAreas, allNewAreas]);

  useEffect(() => {
    setValue('area_ids', areaIds);
  }, [areaIds, setValue]);

  useEffect(() => {
    setAreaIds([...newAreaIds, ...existingAreaIds]);
  }, [existingAreaIds, newAreaIds]);

  useEffect(() => {
    setExistingAreaIds(() => {
      return areaIds.filter((id) => allExistingAreas.includes(id));
    });
  }, [allExistingAreas]);
  useEffect(() => {
    setNewAreaIds(() => {
      return areaIds.filter((id) => allNewAreas.includes(id));
    });
  }, [allNewAreas]);

  const newAreasForPlans = useMemo(
    () =>
      planIds
        ?.map((planId) => {
          const areas = areasByPlan.get(planId);
          if (areas) {
            const newAreas = existingAreaIds.filter(
              (areaId) => !areas.includes(areaId || null)
            );
            if (newAreas.length) {
              return {
                planId,
                areas: newAreas,
              };
            }
          }

          return null;
        })
        .filter((value) => !!value) ?? [],
    [areasByPlan, existingAreaIds, planIds]
  );

  return (
    <div className="flex flex-col w-full space-y-4">
      <div className="flex flex-row space-x-4 items-center">
        <div className="pl-4">Areas</div>
        <div>
          <CustomButton onClick={addAll} color="green">
            Select All Areas
          </CustomButton>
        </div>
      </div>
      <div className="w-full px-4">
        <div>Existing areas for plans</div>
        <Select
          value={existingAreaIds}
          isMulti
          closeMenuOnSelect={false}
          name={'area_ids.existing'}
          onChange={({ target: { value } }) => setExistingAreaIds(value)}
          options={existingAreaOptions}
        />
        <div className="pl-8">
          {!!newAreasForPlans.length && (
            <div>New area details will be set for these plans:</div>
          )}
          <ol className="list-disc">
            {newAreasForPlans.map(({ planId, areas }) => (
              <li key={planId}>
                {`${planId} - ${planNames.get(planId)}: `}
                {areas.map((areaId, index) => (
                  <Fragment key={areaId}>
                    {areaOptions.get(areaId)?.label || `${areaId} - unnamed`}
                    {index < areas.length - 1 && ', '}
                  </Fragment>
                ))}
              </li>
            ))}
          </ol>
        </div>
      </div>
      <div className="w-full px-4">
        <div>Areas not set for plans yet</div>
        <Select
          value={newAreaIds}
          isMulti
          closeMenuOnSelect={false}
          name="area_ids.new"
          onChange={({ target: { value } }) => setNewAreaIds(value)}
          options={newAreaOptions}
        />
      </div>
    </div>
  );
};

export default Areas;
