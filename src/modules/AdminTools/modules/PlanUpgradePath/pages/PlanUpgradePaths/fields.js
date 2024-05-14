import PlanSelect from './PlanSelect';
import EditPlan from './EditPlan';
import UseToPlanPrice from './UseToPlanPrice';
import EditUseToPlan from './EditUseToPlan';
import { planUpgradePathConstants } from '@/modules/AdminTools/lib/constants';

const {
  UPGRADE_TO,
  UPGRADE_TO_LABEL,

  UPGRADE_FROM,
  UPGRADE_FROM_LABEL,

  PRICE_DISCOUNT,
  PRICE_DISCOUNT_LABEL,

  USE_TO_PLAN_PRICE,
  USE_TO_PLAN_PRICE_LABEL,

  MONTHLY_DISCOUNT,
  MONTHLY_DISCOUNT_LABEL,
} = planUpgradePathConstants;

export const fields = [
  {
    label: UPGRADE_FROM_LABEL,
    name: UPGRADE_FROM,
    CreateRender: () => (
      <PlanSelect
        planId={UPGRADE_FROM}
        other={UPGRADE_TO}
        label={UPGRADE_FROM_LABEL}
      />
    ),
    Edit: EditPlan,
    other: UPGRADE_TO,
  },
  {
    label: UPGRADE_TO_LABEL,
    name: UPGRADE_TO,
    CreateRender: () => (
      <PlanSelect
        planId={UPGRADE_TO}
        other={UPGRADE_FROM}
        label={UPGRADE_TO_LABEL}
      />
    ),
    Edit: EditPlan,
    other: UPGRADE_FROM,
  },
  {
    label: PRICE_DISCOUNT_LABEL,
    name: PRICE_DISCOUNT,
    type: 'number',
    step: 0.01,
    required: true,
    min: 0,
  },
  {
    label: MONTHLY_DISCOUNT_LABEL,
    name: MONTHLY_DISCOUNT,
    type: 'number',
    step: 0.01,
    required: true,
    min: 0,
  },
  {
    label: USE_TO_PLAN_PRICE_LABEL,
    name: USE_TO_PLAN_PRICE,
    CreateRender: UseToPlanPrice,
    Edit: EditUseToPlan,
    sort: false,
  },
];
