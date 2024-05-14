import PropTypes from 'prop-types';

import DirectDepositFields from './DirectDepositFields';
import { ReactComponent as SampleCheck } from './SampleCheck.svg';

const DirectDeposit = ({ canEditField, onChangeHandler, disabled }) => {
  return (
    <>
      {disabled && (
        <div className="text-red-600">
          Fill in Direct Deposit info after Workday account is created.
        </div>
      )}
      {!disabled && (
        <div className="flex flex-col gap-y-4">
          <h1>Sample Check</h1>
          <hr />
          <div className="w-full">
            <SampleCheck className="w-full h-auto" />
          </div>
          <h1>Account Information</h1>
          <hr />
          <DirectDepositFields
            {...{ canEditField, onChangeHandler }}
          />
        </div>
      )}
    </>
  );
};

DirectDeposit.propTypes = {
  canEditField: PropTypes.func,
  onChangeHandler: PropTypes.func,
  disabled: PropTypes.bool,
};

export default DirectDeposit;
