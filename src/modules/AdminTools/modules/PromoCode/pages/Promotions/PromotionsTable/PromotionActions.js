import { Select } from '@/components/common';

const PromotionActions = ({ update, remove, data: { id }, onEditClick }) => {
  const options = [
    {
      label: 'Edit',
      value: 'edit',
    },
    {
      label: 'Save',
      value: 'save',
    },
    {
      label: 'Delete',
      value: 'delete',
    },
  ];

  const onChange = (value) => {
    switch (value) {
      case 'edit':
        return onEditClick(id);
      case 'save':
        return update();
      case 'delete':
        return remove();
      default:
        console.error('bad value');
    }
  };

  return (
    <Select
      name="action_select"
      {...{ options }}
      onChange={({ target: { value } }) => onChange(value)}
      placeholder="Actions"
    />
  );
};

export default PromotionActions;
