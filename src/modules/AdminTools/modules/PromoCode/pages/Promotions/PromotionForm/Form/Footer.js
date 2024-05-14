import { CustomButton } from '@/components';

const Footer = () => {
  return (
    <div className="flex flex-row">
      <div className="flex-grow" />
      <CustomButton color={'green'} type="submit">
        Save
      </CustomButton>
    </div>
  );
};

export default Footer;
