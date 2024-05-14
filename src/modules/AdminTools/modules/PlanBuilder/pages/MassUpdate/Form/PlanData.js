import Fields from './Fields';
import Name from './Fields/Field/Name';
import ExternalReferenceId from './Fields/Field/ExternalReferenceId';
import Order from './Fields/Field/Order';
import InitialDiscount from './Fields/Field/InitialDiscount';
import MonthlyDiscount from './Fields/Field/MonthlyDiscount';
import RecurringDiscount from './Fields/Field/RecurringDiscount';
import PlanCategories from './Fields/Field/PlanCategories';
import PlanStatus from './Fields/Field/PlanStatus';
import PlanServiceFrequency from './Fields/Field/PlanServiceFrequency';
import PlanAgreementLengths from './Fields/Field/PlanAgreementLengths';
import StartDate from './Fields/Field/StartDate';
import EndDate from './Fields/Field/EndDate';

const planFieldOptions = [
  { value: 'name', label: 'Name' },
  { value: 'ext_reference_id', label: 'Ext Reference' },
  { value: 'order', label: 'Order' },
  { value: 'plan_category_ids', label: 'Plan Categories' },
  { value: 'plan_status_id', label: 'Plan Status' },
  { value: 'start_on', label: 'Start On' },
  { value: 'end_on', label: 'End On' },
  { value: 'plan_service_frequency_id', label: 'Annual services' },
  { value: 'agreement_length_ids', label: 'Length of service' },
  { value: 'initial_discount', label: 'Initial Discount' },
  { value: 'monthly_discount', label: 'Monthly Discount' },
  { value: 'recurring_discount', label: 'Recurring Discount' },
];

const Edits = {
  name: Name,
  ext_reference_id: ExternalReferenceId,
  order: Order,
  plan_category_ids: PlanCategories,
  plan_status_id: PlanStatus,
  start_on: StartDate,
  end_on: EndDate,
  plan_service_frequency_id: PlanServiceFrequency,
  agreement_length_ids: PlanAgreementLengths,
  initial_discount: InitialDiscount,
  monthly_discount: MonthlyDiscount,
  recurring_discount: RecurringDiscount,
};

const PlanData = () => (
  <Fields
    {...{ Edits }}
    dataField="plan_data"
    fieldOptions={planFieldOptions}
  />
);

export default PlanData;
