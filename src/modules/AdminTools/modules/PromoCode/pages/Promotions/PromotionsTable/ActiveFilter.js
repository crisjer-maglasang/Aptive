import { useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

import Switch from '@/modules/AdminTools/components/Switch';

const useActiveFilter = (data) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const getActive = useMemo(
    () => searchParams.get('active') == 'true',
    [searchParams]
  );
  const getInactive = useMemo(
    () => searchParams.get('inactive') == 'true',
    [searchParams]
  );

  useEffect(() => {
    if (
      searchParams.get('active') === null &&
      searchParams.get('inactive') === null
    ) {
      toggleFilter('active');
    }
  }, [searchParams]);

  const setSearch = (key, search) => {
    searchParams.set(key, search);
    setSearchParams(searchParams);
  };

  const toggleFilter = (key) => {
    setSearch(key, searchParams.get(key) != 'true');
  };

  const filteredData = useMemo(() => {
    return data.filter((obj) => {
      if (getActive && obj.isActive) {
        return true;
      }
      if (getInactive && !obj.isActive) {
        return true;
      }

      return false;
    });
  }, [getInactive, getActive, data]);

  return {
    filteredData,
    Filter: () => (
      <div className='flex flex-col'>
        <label>
          Active{' '}
          <Switch
            onClick={() => toggleFilter('active')}
            enabled={getActive}
            onChange={() => {}}
          />
        </label>
        <label>
          Inactive{' '}
          <Switch
            onClick={() => toggleFilter('inactive')}
            enabled={getInactive}
            onChange={() => {}}
          />
        </label>
      </div>
    ),
  };
};

export default useActiveFilter;
