import { useSelector } from 'react-redux';
import { useCallback, useMemo } from 'react';

import {
  createTargetContractValueAsync,
  removeTargetContractValueAsync,
  targetContractValuesSelector,
  updateTargetContractValueAsync,
} from '@/modules/AdminTools/redux/planBuilder/can-edit-settings/target-contract-values';
import AreaSelect from './AreaSelect';
import EditArea from './EditArea';
import { selectAreasList } from '@/redux/areas-new';
import EditDataTable from '@/modules/AdminTools/components/EditDataTable';
import { AreasProvider } from './AreaContext';
import { planBuilderConstants } from '@/modules/AdminTools/lib/constants';

const { AREA, AREA_LABEL, VALUE, VALUE_LABEL } = planBuilderConstants;

const fields = [
  {
    label: AREA_LABEL,
    name: AREA,
    CreateRender: AreaSelect,
    Edit: EditArea,
  },
  {
    label: VALUE_LABEL,
    name: VALUE,
    type: 'number',
    step: 0.01,
    required: true,
    min: 0,
  },
];

const sortOrders = [AREA, VALUE];

const title = 'Target Contract Values';

const name = 'targetContractValue';

const defaultValues = {
  [AREA]: '',
  [VALUE]: 0,
};

const searchPlaceholder = 'Search by area';

const TargetContractValues = () => {
  const areas = useSelector(selectAreasList);

  const areaNameMap = useMemo(() => {
    const map = {};
    areas.forEach(({ area_id, area_name }) => {
      map[area_id] = area_name;
    });

    return map;
  }, [areas]);

  const getSortField = useCallback(
    (sortingBy) => {
      if (sortingBy === AREA) {
        return (targetContractValue) => {
          const areaId = targetContractValue[AREA];

          return areaNameMap[areaId];
        };
      }

      return (targetContractValue) => targetContractValue[sortingBy];
    },
    [areaNameMap]
  );

  const getSearchField = ({ area_id }) => areaNameMap[area_id];

  return (
    <AreasProvider>
      <EditDataTable
        {...{
          sortOrders,
          searchPlaceholder,
          getSearchField,
          defaultValues,
          title,
          fields,
          name,
          getSortField,
        }}
        updateAsync={updateTargetContractValueAsync}
        removeAsync={removeTargetContractValueAsync}
        createAsync={createTargetContractValueAsync}
        selector={targetContractValuesSelector}
      />
    </AreasProvider>
  );
};

export default TargetContractValues;
