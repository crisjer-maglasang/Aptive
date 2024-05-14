import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import Modal from '@/modules/AdminTools/components/Modal';
import Form from './Form';
import {
  getPromotionSelector,
  updatingPromotionsLoadingSelector,
} from '@/modules/AdminTools/redux/promoCode/promotions';

const PromotionForm = () => {
  const getPromotion = useSelector(getPromotionSelector);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const promotionId = useMemo(
    () => searchParams.get('promotion_id'),
    [searchParams]
  );

  const promotion = useMemo(
    () => getPromotion(promotionId),
    [getPromotion, promotionId]
  );

  const onClose = () => {
    searchParams.delete('promotion_id');
    setSearchParams(searchParams);
    setIsOpen(false);
  };

  const open = () => setIsOpen(true);

  const isUpdating = useSelector(updatingPromotionsLoadingSelector);

  const createPromotionErrors = useSelector(
    (state) => state?.errors?.errors?.promotionsUpdate
  );

  const successfulUpdate = useMemo(
    () => isSubmitted && !isUpdating && !createPromotionErrors,
    [isUpdating, createPromotionErrors, isSubmitted]
  );

  useEffect(() => {
    if (promotion?.id && promotionId === promotion.id && !isOpen) {
      open();
    }
  }, [getPromotion, isOpen, promotion, promotionId]);

  useEffect(() => {
    if (createPromotionErrors && isSubmitted) {
      setIsSubmitted(false);
    }
  }, [createPromotionErrors, isSubmitted]);

  useEffect(() => {
    if (successfulUpdate) {
      onClose();
    }
  }, [successfulUpdate]);

  return (
    <>
      {promotion && (
        <Modal {...{ onClose, isOpen }}>
          <Form {...{ setIsSubmitted, promotion, onClose }} />
        </Modal>
      )}
    </>
  );
};

export default PromotionForm;
