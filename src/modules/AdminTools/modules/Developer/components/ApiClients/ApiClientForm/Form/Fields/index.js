import Name from './Field/Name';
import GroupId from './Field/GroupId';
import Tokens from './Field/Tokens';
import SubFields from '@/modules/AdminTools/components/Form/SubFields';

const fields = [[Name, GroupId], [Tokens]];

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
