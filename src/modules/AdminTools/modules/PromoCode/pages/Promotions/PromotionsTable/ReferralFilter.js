import { useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

import Switch from '@/modules/AdminTools/components/Switch';

const useReferralFilter = (data) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const getReferral = useMemo(
    () => searchParams.get('referral') == 'true',
    [searchParams]
  );
  const getNotReferral = useMemo(
    () => searchParams.get('not-referral') == 'true',
    [searchParams]
  );

  useEffect(() => {
    if (
      searchParams.get('referral') === null &&
      searchParams.get('not-referral') === null
    ) {
      toggleFilter('referral');
      toggleFilter('not-referral');
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
      if (getReferral && obj.isReferral) {
        return true;
      }
      if (getNotReferral && !obj.isReferral) {
        return true;
      }

      return false;
    });
  }, [getNotReferral, getReferral, data]);

  return {
    filteredData,
    Filter: () => (
      <div className='flex flex-col'>
        <label>
          Referral{' '}
          <Switch
            onClick={() => toggleFilter('referral')}
            enabled={getReferral}
            onChange={() => {}}
          />
        </label>
        <label>
          Not Referral{' '}
          <Switch
            onClick={() => toggleFilter('not-referral')}
            enabled={getNotReferral}
            onChange={() => {}}
          />
        </label>
      </div>
    ),
  };
};

export default useReferralFilter;
