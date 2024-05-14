import SectionHeader from '@/modules/AdminTools/modules/PlanBuilder/components/SectionHeader';

const Addons = () => {
  const number = 4;
  const label = 'Additional Services';
  const description =
    'Services must be created in order to be added to any plan. Select the button below to save this plan as a draft, and to create your services.';

  return <SectionHeader {...{ number, label, description }} />;
};

export default Addons;
