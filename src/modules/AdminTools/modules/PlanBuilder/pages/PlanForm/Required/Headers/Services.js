import SectionHeader from '@/modules/AdminTools/modules/PlanBuilder/components/SectionHeader';

const Services = () => {
  const number = 3;
  const label = 'Services';
  const description =
    'Services must be created in order to be added to any plan. Select the button below to save this plan as a draft, and to create your services.';

  return <SectionHeader {...{ number, label, description }} />;
};

export default Services;
