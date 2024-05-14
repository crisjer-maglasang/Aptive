import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import { plansSelector } from '@/modules/AdminTools/redux/planBuilder/plans';
import EmptyPlans from './EmptyPlans';

const EmptyCheck = ({ children }) => {
  const plans = useSelector(plansSelector);

  const loading = useSelector((state) => state?.loading);
  const isLoadingPlans = loading?.plans?.isLoading || false;
  const isLoadingSettings = loading?.settings?.isLoading || false;

  const isLoading = isLoadingPlans || isLoadingSettings;

  return <>{!(isLoading || plans?.length) ? <EmptyPlans /> : children}</>;
};

EmptyCheck.propTypes = {
  children: PropTypes.node.isRequired,
};

export default EmptyCheck;
