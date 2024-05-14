import { forwardRef } from 'react';
import { StepHeader } from '../../../recruits/components';
import { PageLoader } from '@/components/common';
import PropTypes from 'prop-types';

const WizardFormWrapper = forwardRef(({ title, step, isLoading, children }, ref) => {
  return (
    <div ref={ref} className="relative min-h-full pb-6 border border-gray-200 bg-white overflow-hidden rounded-md shadow-sm">
      <StepHeader step={step} title={title} />
      {isLoading
        ? <PageLoader />
        : <>{children}</>}
    </div>
  );
});

WizardFormWrapper.propTypes = {
  title: PropTypes.string,
  step: PropTypes.number,
  isLoading: PropTypes.bool,
  children: PropTypes.node,
};

export default WizardFormWrapper;
