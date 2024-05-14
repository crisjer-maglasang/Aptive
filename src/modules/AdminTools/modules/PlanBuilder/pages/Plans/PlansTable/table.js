import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { formatDateDisplay } from '@/lib';
import PlanCategories from './PlanCategories';
import { planBuilderConstants } from '@/modules/AdminTools/lib/constants';

const nameField = 'name';

const Edit = ({ id, name }) => (
  <Link to={`/plan-builder/plan/${id}/edit`} className="text-primary-300">
    {name}
  </Link>
);

Edit.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
};

const table = [
  {
    label: planBuilderConstants.ORDER_LABEL,
    sortBy: planBuilderConstants.ORDER,
    render: ({ plan: { order } }) => order,
  },
  {
    label: planBuilderConstants.PLAN_STATUS_LABEL,
    sortBy: planBuilderConstants.PLAN_STATUS,
    render: ({ settings, plan: { plan_status_id } }) =>
      settings.get('plan_statuses', plan_status_id, nameField) || '',
  },
  {
    label: planBuilderConstants.NAME_LABEL,
    sortBy: planBuilderConstants.NAME,
    render: ({ plan: { id, name } }) => <Edit {...{ id, name }} />,
  },
  {
    label: planBuilderConstants.PLAN_CATEGORIES_LABEL,
    render: ({ plan: { plan_category_ids } }) => (
      <PlanCategories {...{ plan_category_ids }} />
    ),
  },
  {
    label: planBuilderConstants.START_ON_LABEL,
    sortBy: planBuilderConstants.START_ON,
    render: ({ plan: { start_on } }) => formatDateDisplay(start_on),
  },
  {
    label: planBuilderConstants.END_ON_LABEL,
    sortBy: planBuilderConstants.END_ON,
    render: ({ plan: { end_on } }) => formatDateDisplay(end_on),
  },
  {
    label: '',
    render: ({ remove }) => (
      <div className="cursor-pointer text-primary-300" onClick={remove}>
        {planBuilderConstants.DELETE}
      </div>
    ),
  },
  {
    label: '',
    render: ({ plan: { id } }) => (
      <Edit {...{ id }} name={planBuilderConstants.EDIT} />
    ),
  },
];

export default table;
