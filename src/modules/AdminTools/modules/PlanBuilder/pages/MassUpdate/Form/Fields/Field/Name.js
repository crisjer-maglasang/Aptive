import { useFormContext } from 'react-hook-form';

import { CustomFormElement } from '@/components/common';
import { useCallback, useEffect, useState } from 'react';

const FIELD = 'plan_data.name';

const Name = () => {
  const { setValue } = useFormContext();
  const [name, setName] = useState('');

  const updateForm = useCallback(
    (value) => {
      setValue(FIELD, value);
    },
    [setValue]
  );

  useEffect(() => {
    if (!name.trim()) {
      return;
    }
    updateForm(name);
  }, [name, updateForm]);

  useEffect(() => {
    if (name.trim() === name) {
      return;
    }

    const timer = setTimeout(() => setName(name.trim()), 300);

    return () => clearTimeout(timer);
  }, [name]);

  return (
    <CustomFormElement
      onChange={({ target: { value } }) => setName(value)}
      type="text"
      name={FIELD}
      value={name}
      label="Name"
      required
    />
  );
};

export default Name;
