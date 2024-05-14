import { useDispatch, useSelector } from 'react-redux';

import {
  createPlanCanSellTotalsThresholdAsync,
  planCanSellTotalsThresholdSelector,
  updatePlanCanSellTotalsThresholdAsync,
} from '@/modules/AdminTools/redux/planBuilder/plan-can-sell-totals-threshold';
import { CustomButton, CustomFormElement } from '@/components/common';
import { useEffect, useState } from 'react';

const CanSellThreshold = () => {
  const dispatch = useDispatch();
  const currThreshold = useSelector(planCanSellTotalsThresholdSelector);

  const isLoading = useSelector(
    (state) => state.loading?.updatePlanCanSellTotalsThreshold?.isLoading
  );

  const [countThreshold, setCountThreshold] = useState(0);
  const [dollarAmountThreshold, setDollarThreshold] = useState(0);
  const [multiYearThreshold, setMultiYearThreshold] = useState(0);
  const [dateThreshold, setDateThreshold] = useState(0);

  useEffect(() => {
    setCountThreshold(() => currThreshold?.count_threshold || '');
    setDollarThreshold(() => currThreshold?.dollar_amount_threshold || '');
    setDateThreshold(() => currThreshold?.threshold_start_date || '');
    setMultiYearThreshold(() => currThreshold?.multi_year_threshold || '');
  }, [currThreshold]);

  const onSave = (_e) => {
    _e.preventDefault();

    const request =
      currThreshold === null
        ? createPlanCanSellTotalsThresholdAsync
        : updatePlanCanSellTotalsThresholdAsync;

    dispatch(
      request.request({
        count_threshold: countThreshold,
        dollar_amount_threshold: dollarAmountThreshold,
        multi_year_threshold: multiYearThreshold,
        threshold_start_date: new Date(dateThreshold).toISOString(),
      })
    );
  };

  return (
    <form onSubmit={onSave}>
      <div className="flex flex-col space-y-4 w-64">
        <CustomFormElement
          label={'Sales Total Threshold'}
          value={countThreshold}
          type="number"
          id={'countThreshold'}
          name={'countThreshold'}
          onChange={({ target: { value } }) => setCountThreshold(value)}
          required
          min={0}
          step={1}
        />
        <CustomFormElement
          label={'Dollar Amount Threshold'}
          value={dollarAmountThreshold}
          type="number"
          id={'dollarAmountThreshold'}
          name={'dollarAmountThreshold'}
          onChange={({ target: { value } }) => setDollarThreshold(value)}
          required
          min={0}
          step={1}
        />
        <CustomFormElement
          label={'Multi Year % Threshold'}
          value={multiYearThreshold}
          type="number"
          id={'multiYearThreshold'}
          name={'multiYearThreshold'}
          onChange={({ target: { value } }) => setMultiYearThreshold(value)}
          required
          min={0}
          max={100}
          step={0.01}
        />
        <CustomFormElement
          label={'Date Threshold'}
          formValue={dateThreshold}
          type="date"
          id={'multiYearThreshold'}
          name={'multiYearThreshold'}
          onChange={({ target: { value } }) => setDateThreshold(value)}
          required
        />
        <div>
          <CustomButton disabled={isLoading} type={'submit'} color="green">
            Save
          </CustomButton>
        </div>
      </div>
    </form>
  );
};

export default CanSellThreshold;
