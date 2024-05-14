import Name from './Field/Name';
import AgreementLengths from './Field/AgreementLengths';
import PlanStatus from './Field/PlanStatus';
import PlanServiceFrequency from './Field/PlanServiceFrequency';
import PlanCategories from './Field/PlanCategories';
import StartDate from './Field/StartDate';
import EndDate from './Field/EndDate';
import ExternalReference from './Field/ExternalReference';
import SubSettings from './SubSettings';
import InitialDiscount from './Field/InitialDiscount';
import MonthlyDiscount from './Field/MonthlyDiscount';
import RecurringDiscount from './Field/RecurringDiscount';
import Order from './Field/Order';

const settings = [
  [Name, ExternalReference, Order],
  [PlanCategories, PlanStatus],
  [StartDate, EndDate],
  [PlanServiceFrequency, AgreementLengths],
  [InitialDiscount, RecurringDiscount, MonthlyDiscount],
];

const Fields = () => (
  <div className="flex flex-col space-y-6">
    {settings.map((subSettings, index) => (
      <SubSettings {...{ subSettings }} key={index} />
    ))}
  </div>
);

export default Fields;
