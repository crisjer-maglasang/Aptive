import PropTypes from 'prop-types';
import { useContext, createContext, useMemo, useCallback } from 'react';

import { targetContractValuesSelector } from '@/modules/AdminTools/redux/planBuilder/can-edit-settings/target-contract-values';
import { selectAreasList } from '@/redux/areas-new';
import { useSelector } from 'react-redux';

const AreaContext = createContext();

const useGetAreaOptions = () => useContext(AreaContext);

const AreasProvider = ({ children }) => {
  const areas = useSelector(selectAreasList);
  const targetContractValues = useSelector(targetContractValuesSelector);

  const options = useMemo(() => {
    if (areas) {
      const areaIds = targetContractValues.map(({ area_id }) => area_id);

      return areas
        .filter(({ area_id }) => !areaIds.includes(area_id))
        .map(({ area_id, area_name }) => ({
          label: area_name,
          value: area_id,
        }));
    }

    return [];
  }, [areas, targetContractValues]);

  const getOptions = useCallback(
    (area_id) => {
      const matchingArea = areas.find((area) => area.area_id === area_id);
      const baseOptions = [
        {
          label: 'Select an Area',
          value: '',
        },
      ];

      if (matchingArea) {
        baseOptions.push({
          label: matchingArea.area_name,
          value: area_id,
        });
      }

      return [...baseOptions, ...options];
    },
    [areas, options]
  );

  return (
    <AreaContext.Provider value={getOptions}>{children}</AreaContext.Provider>
  );
};

AreasProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AreasProvider, useGetAreaOptions };
