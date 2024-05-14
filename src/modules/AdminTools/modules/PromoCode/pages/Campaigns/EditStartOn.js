import { CustomFormElement } from '@/components/common';

const EditStartOn = ({ value, name, onChange, error }) => {
  return (
    <CustomFormElement
      formValue={value}
      type="date"
      {...{ name, onChange, error }}
      required
    />
  );
};

export default EditStartOn;
