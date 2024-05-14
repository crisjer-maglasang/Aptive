import SectionHeader from '@/modules/AdminTools/modules/PlanBuilder/components/SectionHeader';

const BasicInfo = () => {
  const number = 1;
  const label = 'Basic information';
  const description = '';

  return <SectionHeader {...{ number, label, description }} />;
};

export default BasicInfo;
