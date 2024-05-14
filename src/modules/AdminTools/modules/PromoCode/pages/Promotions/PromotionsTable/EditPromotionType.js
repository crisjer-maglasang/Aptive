import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { CustomFormElement } from '@/components/common';
import { promotionTypesSelector } from '@/modules/AdminTools/redux/promoCode/promotions';

const EditPromotionType = ({ value, name, onChange, error, disabled }) => {
  const types = useSelector(promotionTypesSelector);

  const options = useMemo(() => {
    if (!types) {
      return [];
    }

    return types.map((promotionType) => ({
      label: promotionType,
      value: promotionType,
    }));
  }, [types]);

  return (
    <CustomFormElement
      {...{
        onChange,
        value,
        options,
        name,
        error,
      }}
      type="multiSelect"
      required
      disabled={disabled}
    />
  );
};

EditPromotionType.propTypes = {
  value: PropTypes.any.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.any,
  disabled: PropTypes.bool,
};

export default EditPromotionType;
