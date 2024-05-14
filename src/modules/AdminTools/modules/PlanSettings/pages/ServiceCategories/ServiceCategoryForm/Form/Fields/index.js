import SubFields from '@/modules/AdminTools/components/Form/SubFields';
import Name from './Field/Name';
import Order from './Field/Order';
import SubCategories from './Field/SubCategories';

const fields = [
  [Name, Order],
  [SubCategories],
];

const Fields = () => {
  return (
    <div className="flex flex-col">
      {fields.map((subFields, index) => (
        <SubFields {...{ subFields }} key={index} />
      ))}
    </div>
  );
};

export default Fields;
