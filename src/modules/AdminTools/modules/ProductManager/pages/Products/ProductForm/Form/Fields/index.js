import Name from './Field/Name';
import Order from './Field/Order';
import ExternalReference from './Field/ExternalReference';
import Category from './Field/Category';
import SubCategory from './Field/SubCategory';
import Recurring from './Field/Recurring';
import prices from './Field/Prices';
import Image from './Field/Image';
import NeedsCustomerSupport from './Field/NeedsCustomerSupport';
import Description from './Field/Description';
import SubFields from '@/modules/AdminTools/components/Form/SubFields';

const fields = [
  [Name, Order, ExternalReference],
  [Description],
  [Category, SubCategory],
  [Recurring, NeedsCustomerSupport],
  prices,
  [Image],
];

const Fields = () => {
  return (
    <div className="p-1 space-y-6 flex flex-col w-full overflow-hidden h-70vh overflow-y-scroll">
      {fields.map((subFields, index) => (
        <SubFields {...{ subFields }} key={index} />
      ))}
    </div>
  );
};

export default Fields;
