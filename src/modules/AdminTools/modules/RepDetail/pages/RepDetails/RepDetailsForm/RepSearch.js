import { useEffect, useMemo, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Select } from '@/components/common';
import { productManagerConstants } from '@/modules/AdminTools/lib/constants';
import { manageUsersSelector, requestUsersAsync } from '@/redux/users';

const { REP, REP_LABEL } = productManagerConstants;

const RepSearch = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { setValue } = useFormContext();
  const dispatch = useDispatch();
  const reps = useSelector(manageUsersSelector);

  const [timeoutId, setTimeoutId] = useState(null);

  const [initialName] = useState(searchParams.get('rep_search'));

  const repId = useWatch({ name: REP });

  const onSearch = (name) => {
    clearTimeout(timeoutId);

    if (!name) {
      return;
    }

    const delayedRequest = setTimeout(() => {
      const params = {
        filter: {
          is_active: true,
          search: name,
        },
      };

      dispatch(requestUsersAsync.request(params));
    }, 500); // Adjust the delay time as needed

    setTimeoutId(delayedRequest);
  };

  useEffect(() => {
    if (initialName) {
      onSearch(initialName);
    }
  }, []);

  const options = useMemo(() => {
    if (!reps) {
      return [];
    }

    return reps.map(({ id, name }) => ({
      label: name,
      value: id,
    }));
  }, [reps]);

  const handleChange = ({ target: { value } }) => {
    setValue(REP, value);

    const rep = reps.find(({ id }) => id === value);

    if (rep) {
      searchParams.set('rep_search', rep.name);
    }

    setSearchParams(searchParams);
  };

  return (
    <div className="flex flex-col w-64">
      <div className="flex items-center">
        <div className="flex text-sm font-medium text-gray-700">
          <label>{REP_LABEL}</label>
        </div>
      </div>
      <div className="mt-0.5 block rounded-md shadow-sm">
        <Select
          options={options}
          name={'search'}
          onChange={handleChange}
          value={repId}
          onInputChange={onSearch}
          filterOption={() => true}
          defaultInputValue={initialName}
          placeholder={'Start to type'}
        />
      </div>
    </div>
  );
};

export default RepSearch;
