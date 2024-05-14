import { useFormContext } from 'react-hook-form';

import { CustomFormElement } from '@/components/common';
import { useCallback, useEffect, useState } from 'react';

const FIELD = 'plan_data.ext_reference_id';

const ExternalReferenceId = () => {
  const { setValue } = useFormContext();
  const [extReference, setName] = useState('');

  const updateForm = useCallback(
    (value) => {
      setValue(FIELD, value);
    },
    [setValue]
  );

  useEffect(() => {
    if (!extReference.trim()) {
      return;
    }
    updateForm(extReference);
  }, [extReference, updateForm]);

  useEffect(() => {
    if (extReference.trim() === extReference) {
      return;
    }

    const timer = setTimeout(() => setName(extReference.trim()), 300);

    return () => clearTimeout(timer);
  }, [extReference]);

  return (
    <CustomFormElement
      onChange={({ target: { value } }) => setName(value)}
      type="text"
      name={FIELD}
      value={extReference}
      label="Ext Reference"
      required
    />
  );
};

export default ExternalReferenceId;
