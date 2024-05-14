import PropTypes from 'prop-types';
import { useEffect, useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';
import { useSelector } from 'react-redux';

import { plansSelector } from '@/modules/AdminTools/redux/planBuilder/plans';
import { editPlan } from '@/modules/AdminTools/routing/plan-builder';
import Tabs from '@/modules/AdminTools/components/Tabs';
import * as planBuilderRoutes from '@/modules/AdminTools/routing/plan-builder';
import { updatingPlanLoadingSelector } from '@/redux/loading';
import FormControls from './FormControls';
import { planBuilderConstants } from '@/modules/AdminTools/lib/constants';

const { CREATE_PLAN_REQUIRED, CREATE_PLAN_OPTIONAL } =
  planBuilderConstants;

const PlanForm = ({ defaultValues, onSubmit, submitText }) => {
  const urlParams = useParams();
  const planId = urlParams?.id;

  const navigate = useNavigate();

  const planErrors = useSelector((state) => state?.errors?.errors?.updatePlan);
  const plans = useSelector(plansSelector);

  const isUpdating = useSelector(updatingPlanLoadingSelector);

  const [isSubmitted, setIsSubmitted] = useState(false);

  const methods = useForm({
    defaultValues,
  });

  const successfulUpdate = useMemo(
    () => isSubmitted && !isUpdating && !planErrors,
    [isUpdating, planErrors, isSubmitted]
  );

  useEffect(() => {
    if (!successfulUpdate) {
      return;
    }

    // Notification of success.
    if (!planId) {
      const id = plans[plans.length - 1].id;
      navigate(editPlan(id));
    } else {
      window.location.reload();
    }
  }, [plans, navigate, planId, successfulUpdate]);

  useEffect(() => {
    if (planErrors && isSubmitted) {
      setIsSubmitted(false);
    }
  }, [setIsSubmitted, planErrors, isSubmitted]);

  const handleSubmit = (data) => {
    if (isUpdating) {
      return;
    }

    onSubmit({ plan: data });

    setIsSubmitted(true);
  };

  let link = planBuilderRoutes.PLAN_PATH;

  if (planId) {
    link = planBuilderRoutes.editPlan(planId);
  }

  const links = [
    {
      to: link,
      text: CREATE_PLAN_REQUIRED,
    },
    {
      to: planBuilderRoutes.optionalPlan(link),
      text: CREATE_PLAN_OPTIONAL,
    },
  ];

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleSubmit)}>
        <Tabs
          links={links}
          headerChild={<FormControls {...{ submitText }} />}
        />
      </form>
    </FormProvider>
  );
};

PlanForm.propTypes = {
  defaultValues: PropTypes.any.isRequired,
  onSubmit: PropTypes.func.isRequired,
  submitText: PropTypes.any.isRequired,
};

export default PlanForm;
