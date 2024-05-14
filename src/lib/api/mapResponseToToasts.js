import { toastType } from '@/components/common';
import { ERROR_500 } from '@/lib/validations';

export const mapErrorToastsData = (error) => {
  const { data: { errors = [] } = {}, status } = error?.response ?? {};

  return errors.map(({ detail: message }) => ({
    type: toastType.ERROR,
    message: Number(status) >= 500 ? ERROR_500 : message,
    details: null,
  }));
};

export const mapSuccessToastsData = (response) => {
  const { message } = response?.data?.attributes ?? {};

  return [{
    type: toastType.SUCCESS,
    message: message,
    details: null,
  }];
};
