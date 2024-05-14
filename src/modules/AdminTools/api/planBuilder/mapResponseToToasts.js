import { toastType } from '@/components/common';

export const mapMassUpdateToast = ({ updated }) => {
  if (updated) {
    return [
      {
        type: toastType.SUCCESS,
        message: 'Updated successfully',
        details: null,
      },
    ];
  } else {
    return [
      {
        type: toastType.WARNING,
        message: 'Nothing was updated',
        details: null,
      },
    ];
  }
};
