import PropTypes from 'prop-types';

import SubFields from '@/modules/AdminTools/components/Form/SubFields';
import Campaign from './Field/Campaign';
import Code from './Field/Code';
import Conditions from './Field/Conditions';
import Description from './Field/Description';
import EfficacyMonths from './Field/EfficacyMonths';
import EfficacyServiceCount from './Field/EfficacyServiceCount';
import EndOn from './Field/EndOn';
import InitialDiscountRate from './Field/InitialDiscountRate';
import InitialDiscountValue from './Field/InitialDiscountValue';
import IsCustomerReferral from './Field/IsCustomerReferral';
import IsEmployeeReferral from './Field/IsEmployeeReferral';
import IsFirstTimeOnly from './Field/IsFirstTimeOnly';
import IsStackable from './Field/IsStackable';
import MaxDiscountValue from './Field/MaxDiscountValue';
import MaxUsagePerCampaign from './Field/MaxUsagePerCampaign';
import Plans from './Field/Plans';
import Addons from './Field/Addons';
import PromotionType from './Field/PromotionType';
import RecurringDiscountRate from './Field/RecurringDiscountRate';
import RecurringDiscountValue from './Field/RecurringDiscountValue';
import ReferralRate from './Field/ReferralRate';
import ReferralValue from './Field/ReferralValue';
import StartOn from './Field/StartOn';
import classNames from 'classnames';
// import UpdatedBy from './Field/UpdatedBy';
// import DisabledBy from './Field/DisabledBy';
// import CreatedBy from './Field/CreatedBy';
// import UpdatedAt from './Field/UpdatedAt';
// import DisabledAt from './Field/DisabledAt';
// import CreatedAt from './Field/CreatedAt';

const fields = [
  [Code],
  [Campaign, PromotionType],
  [Description],
  [StartOn, EndOn],
  [Plans],
  [Addons],
  [Conditions],
  [IsCustomerReferral, IsEmployeeReferral, IsStackable, IsFirstTimeOnly],
  [MaxDiscountValue, MaxUsagePerCampaign],
  [InitialDiscountRate, InitialDiscountValue],
  [
    RecurringDiscountRate,
    RecurringDiscountValue,
    EfficacyMonths,
    EfficacyServiceCount,
  ],
  [ReferralRate, ReferralValue],
  // [() => <hr />],
  // [UpdatedBy, CreatedBy, DisabledBy],
  // [UpdatedAt, CreatedAt, DisabledAt],
];

const Fields = ({ disabled }) => {
  return (
    <div className="p-1 space-y-6 flex flex-col w-full overflow-hidden h-70vh overflow-y-scroll">
      {fields.map((subFields, index) => (
        <SubFields
          {...{ subFields, disabled }}
          key={index}
          baseWrapperClassName={classNames({
            'bg-gray-100': disabled,
          })}
          innerClassName={classNames({
            'bg-gray-100': disabled,
          })}
        />
      ))}
    </div>
  );
};

Fields.propTypes = {
  disabled: PropTypes.bool,
};

export default Fields;
