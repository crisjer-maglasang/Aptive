import SectionHeader from '@/modules/AdminTools/modules/PlanBuilder/components/SectionHeader';

const Levels = () => {
  const number = 2;
  const label = 'Levels';
  const description =
    'Levels must be created in order to be added to any plan. Select the button below to save this plan as a draft, and to create your levels.';

  return <SectionHeader {...{ number, label, description }} />;
};

export default Levels;
