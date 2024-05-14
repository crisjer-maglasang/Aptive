import { useStableCallback } from '@/hooks';
import { useMemo } from 'react';
import { ledgerConstants } from '@/modules/Housing/lib';

const {
  APARTMENT_IDS_NAME,
  APARTMENT_ID_NAME,
  VENDOR_NAME,
  PAYEE_NAME,
  PAYMENT_TYPE_NAME,
  PAYMENT_METHOD_NAME,
  AMOUNT_TO_PAY_NAME,
  AMOUNT_PAID_NAME,
  DATE_PAID_NAME,
} = ledgerConstants;

const useLedgerEditable = ({
  ledgerId,
  isEditable,
}) => {
  const isEditLedger = useMemo(() => {   
    if (!!ledgerId) {
      return true;
    }
    return false;
  }, [
    ledgerId,
  ]);

  const canEditField = useStableCallback((fieldName) => {
    const isEditableField = [
      APARTMENT_ID_NAME,
      APARTMENT_IDS_NAME,
      VENDOR_NAME,
      PAYEE_NAME,
      PAYMENT_TYPE_NAME,
      PAYMENT_METHOD_NAME,
      AMOUNT_TO_PAY_NAME,
      AMOUNT_PAID_NAME,
      DATE_PAID_NAME,
    ].includes(fieldName);

    if (!isEditLedger) {
      return true;
    }

    return isEditableField && isEditable;
  });

  return {
    isEditLedger,
    canEditField,
  };
};

export default useLedgerEditable;
