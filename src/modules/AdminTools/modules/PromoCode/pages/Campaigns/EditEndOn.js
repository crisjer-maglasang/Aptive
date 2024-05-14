import { CustomFormElement } from '@/components/common';

const EditEndOn = ({ value, name, onChange }) => {
  return (
    <CustomFormElement formValue={value} type="date" {...{ name, onChange }} />
  );
};

export default EditEndOn;
