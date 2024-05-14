import { toast, toastType, Message, ToastContainer } from '@/components';
import { toastsSelector, flushToastsAction } from '@/redux/toasts';
import { useLayoutEffect } from 'react';
import { connect } from 'react-redux';

const Toasts = ({ toasts, flushToasts }) => {
  /**
   * The `useLayoutEffect` is used instead of `useEffect`
   * because toasts may be added in separate actions,
   * so we have to block next render until all current toasts will be added.
   *
   * Assuming multiple toasts will be added all at once,
   * blocking the next render should not be a problem.
   */
  useLayoutEffect(() => {
    // Return early if no toasts to create to avoid an infinite rendering.
    if (!toasts.length) {
      return;
    }

    // TODO: Create a function for creating toasts.
    toasts.forEach(({ type, message, details }) => {
      toast(<Message message={message} details={details} />, {
        type,
        ...(type === toastType.ERROR || !!details ? {
          autoClose: false,
          closeOnClick: false,
        } : {}),
      });
    });

    flushToasts();
  }, [toasts]);

  return (
    <ToastContainer />
  );
};

const mapStateToProps = (state) => ({
  toasts: toastsSelector(state),
});

const mapDispatchToProps = {
  flushToasts: flushToastsAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Toasts);
