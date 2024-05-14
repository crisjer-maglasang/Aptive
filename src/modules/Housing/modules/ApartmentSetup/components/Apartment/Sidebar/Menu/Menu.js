import { memo } from 'react';
import { MenuItem } from '.';
import PropTypes from 'prop-types';
import { apartmentConstants } from '@/modules/Housing/lib';
import { mergeClassName } from '@/lib/utils';

const {
  HISTORY_STEP_ID,
} = apartmentConstants;

const callbackCache = {};

const Menu = ({
  items,
  currentStep,
  setCurrentStep,
  setNextStep,
  apartmentId,
}) => {
  const onItemClick = (id) => {
    const cached = callbackCache[id] = callbackCache[id] ?? {
      ref: null,
      callback: () => cached.ref(),
    };

    cached.ref = () => {
      const applyTransition = () => {
        setNextStep(null);
        setCurrentStep(id);
      };

      const declineTransition = () => {
        setNextStep(null);
      };

      setNextStep({ applyTransition, declineTransition });
    };

    return cached.callback;
  };

  return (
    <>
      <nav aria-label="Progress">
        <ol>
          {items.map(({
            id,
            path,
            label,
            completed,
          }) => (
            <MenuItem
              key={id}
              label={label}
              onClick={onItemClick(id, path)}
              selected={id === currentStep}
              completed={completed}
            />
          ))}
        </ol>
      </nav>
      {apartmentId && (
        <nav aria-label="Extra">
          <ol>
            <li
              key={HISTORY_STEP_ID}
              onClick={onItemClick(HISTORY_STEP_ID, null)}
              className="border-t cursor-pointer"
              role="button"
            >
              <div
                className={mergeClassName(
                  'border-l-4 border-l-transparent py-3 pr-6 pl-5 text-sm text-aptiveblue',
                  {'border-l-aptiveblue': HISTORY_STEP_ID === currentStep},
                )}
              >
                History
              </div>
            </li>
          </ol>
        </nav>
      )}
    </>
  );
};

Menu.propTypes = {
  items: PropTypes.array,
  currentStep: PropTypes.number,
  setCurrentStep: PropTypes.func,
  setNextStep: PropTypes.func,
};

export default memo(Menu);
