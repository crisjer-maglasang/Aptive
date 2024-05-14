import { onboardingSidebar } from '@/lib/constants';
import { removeTrailingSlashes } from '@/lib/utils';
import PropTypes from 'prop-types';
import { memo, useEffect } from 'react';
import { useLocation } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { ExtraMenuItem, WizardMenuItem } from '.';

const {
  PERSONAL_INFO_STEP_ID,
} = onboardingSidebar;

const callbackCache = {};

const Menu = ({
  items,
  wizardType,
  isPersonalWizard,
  isPopup,
  isOnboarded,
  currentStep,
  setCurrentStep,
  setNextStep,
}) => {
  const renderConditions = {
    wizardType,
    isPersonalWizard,
    isOnboarded,
  };

  const navigate = useNavigate();

  // I wished to use `useStableCallback()` instead.
  // However, the `react-hooks/rules-of-hooks` eslint rule throws an exception.
  //
  // It is unsafe to use any hooks (in particular `useRef`) conditionally.
  // See https://reactjs.org/docs/hooks-rules.html
  const onItemClick = (id, path) => {
    const cached = callbackCache[id] = callbackCache[id] ?? {
      ref: null,
      callback: () => cached.ref(),
    };

    cached.ref = () => {
      const applyTransition = () => {
        setNextStep(null);
        setCurrentStep(id);

        if (!isPopup) {
          navigate(`/onboarding/${path}`, { replace: true });
        }
      };

      const declineTransition = () => {
        setNextStep(null);
      };

      // When going out of the Wizard Forms, the intention to perform a transition is expressed.
      // Forms subscribed to such intention expressions and can take care of additional stuff
      // prior to applying or denying transition. For example, run validations/save processes.
      //
      // In all other cases, the location, i.e., `currentStep` and URL (if supported) change immediately.
      if (items.isWizardItem(currentStep) || items.isWorkdayTasks(currentStep)) {
        setNextStep({ applyTransition, declineTransition });
      } else {
        applyTransition();
      }
    };

    return cached.callback;
  };

  const location = useLocation();

  // This effect is aimed to fix the out-of-sync `currentStep/currentPath` issue.
  //
  // In Outlet mode (which is the opposite of Popup mode) on initial mount
  // the `currentStep` equals its default value set in the Redux store.
  //
  // However, this default value can differ from an actual `currentStep`.
  // The actual `currentStep` value can be resolved by a `currentPath`.
  useEffect(() => {
    if (!isPopup) {
      const landedStep = items.resolveItemByPath(
        removeTrailingSlashes(location.pathname).split('/').pop(),
      )?.id ?? PERSONAL_INFO_STEP_ID;

      if (landedStep !== currentStep) {
        setCurrentStep(landedStep);
      }
    }

    // This effect needs to be run only on the initial component mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <nav aria-label="Progress">
        <ol>
          {items.wizard.map(({
            id,
            path,
            label,
            shouldDisplay,
            completed,
          }) => shouldDisplay(renderConditions) && (
            <WizardMenuItem
              key={id}
              label={label(renderConditions)}
              onClick={onItemClick(id, path)}
              selected={id === currentStep}
              completed={completed}
            />
          ))}
        </ol>
      </nav>
      <nav aria-label="Extra">
        <ul>
          {items.extra.map(({
            id,
            path,
            label,
            shouldDisplay,
          }) => shouldDisplay(renderConditions) && (
            <ExtraMenuItem
              key={id}
              label={label(renderConditions)}
              onClick={onItemClick(id, path)}
              selected={id === currentStep}
            />
          ))}
        </ul>
      </nav>
    </>
  );
};

Menu.propTypes = {
  items: PropTypes.shape({
    wizard: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      path: PropTypes.string.isRequired,
      label: PropTypes.func.isRequired,
      shouldDisplay: PropTypes.func.isRequired,
      completed: PropTypes.bool.isRequired,
      countable: PropTypes.bool.isRequired,
    })).isRequired,
    extra: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      path: PropTypes.string.isRequired,
      label: PropTypes.func.isRequired,
      shouldDisplay: PropTypes.func.isRequired,
    })).isRequired,
    isWizardItem: PropTypes.func.isRequired,
    isWorkdayTasks: PropTypes.func.isRequired,
    resolveItemByPath: PropTypes.func.isRequired,
  }).isRequired,
  wizardType: PropTypes.string.isRequired,
  isPersonalWizard: PropTypes.bool.isRequired,
  isPopup: PropTypes.bool.isRequired,
  isOnboarded: PropTypes.bool.isRequired,
  currentStep: PropTypes.number.isRequired,
  setCurrentStep: PropTypes.func.isRequired,
  setNextStep: PropTypes.func.isRequired,
};

export default memo(Menu);
