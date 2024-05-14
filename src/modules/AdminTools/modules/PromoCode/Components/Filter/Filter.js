import PropTypes from 'prop-types';

import { CustomFormElement } from '@/components/common';
import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

const Filter = ({ Edit, remove, name, label }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const value = useMemo(() => {
    const val = searchParams.get(name);

    if (val === null) {
      return '';
    }

    return val;
  }, [name, searchParams]);
  const onChange = ({ target: { value } }) => {
    searchParams.set(name, value);
    setSearchParams(searchParams);
  };

  let props = {
    onChange,
    value,
    name,
    label,
    formValue: value,
  };
  if (typeof Edit === 'string') {
    props = {
      ...props,
      type: Edit,
    };
    Edit = CustomFormElement;
  }

  const onRemove = () => {
    searchParams.delete(name);
    setSearchParams(searchParams);
    remove();
  };

  return (
    <div className="flex flex-row items-center">
      <div className="w-64">
        <Edit {...props} />
      </div>
      <button type="button" className="text-red-500 px-4" onClick={onRemove}>
        remove
      </button>
    </div>
  );
};

Filter.propTypes = {
  Edit: PropTypes.any.isRequired,
  remove: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default Filter;
