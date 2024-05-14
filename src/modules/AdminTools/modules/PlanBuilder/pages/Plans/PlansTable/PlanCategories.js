import PropTypes from 'prop-types';
import { settingsSelector } from '@/modules/AdminTools/redux/planBuilder/settings';
import { useSelector } from 'react-redux';

const PlanCategories = ({ plan_category_ids }) => {
  const settings = useSelector(settingsSelector);

  const names = plan_category_ids.map((id) =>
    settings.get('plan_categories', id, 'name')
  );

  return (
    <ul className="list-disc">
      {names.map((name) => (
        <li key={name}>{name}</li>
      ))}
    </ul>
  );
};

PlanCategories.propTypes = {
  plan_category_ids: PropTypes.array.isRequired,
};

export default PlanCategories;
