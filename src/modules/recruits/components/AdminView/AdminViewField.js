import { FormLabel } from '@/components/common';

const AdminViewField = ({ label, value }) => {
  return (
    <div className="flex flex-col w-1/2 mb-4">
      <FormLabel label={label} />
      <div className="relative">
        {value ?? '(n/a)'}
      </div>
    </div>
  );
};

export default AdminViewField;
