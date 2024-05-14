import { toastType } from '@/components/common';
import { ERROR_500 } from '@/lib/validations';

export const authenticateWithTokenErrors = (error) => {
  const { data: { errors = [] } = {}, status } = error?.response ?? {};

  return errors.map((message) => ({
    type: toastType.ERROR,
    message: Number(status) >= 500 ? ERROR_500 : message,
    details: null,
  }));
};
