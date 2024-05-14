import { createSelector } from 'reselect';

import { plansSelector } from '@/modules/AdminTools/redux/planBuilder/plans';
import Select from '@/modules/AdminTools/components/Form/Select';

const toOptions = (arr) =>
  arr.map(({ name, id }) => ({
    label: `${id} - ${name}`,
    value: id,
  }));

const planOptionsSelector = createSelector(plansSelector, (state) =>
  toOptions(state)
);

const Plans = (props) => (
  <Select
    isMulti
    label="Plans"
    name="plan_ids"
    selector={planOptionsSelector}
    error="promotionsUpdate"
    {...props}
  />
);

export default Plans;
