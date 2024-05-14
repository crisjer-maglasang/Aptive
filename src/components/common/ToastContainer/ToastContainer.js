import { memo, useEffect, useRef } from 'react';
import { toast, ToastContainer as BaseToastContainer } from 'react-toastify';

const ToastContainer = () => {
  const containerRef = useRef(null);

  /**
   * Adding the `data-headlessui-portal` attribute
   * will prevent opened modal dialog from being closed on toast click.
   *
   * Unfortunately, this trick isn't stable solution,
   * so be careful with updating @headlessui/react package.
   *
   * @see https://github.com/tailwindlabs/headlessui/blob/%40headlessui/react%40v1.6.5/packages/%40headlessui-react/src/components/dialog/dialog.tsx#L198-L217
   * @see https://github.com/tailwindlabs/headlessui/blob/%40headlessui/react%40v1.6.5/packages/%40headlessui-react/src/hooks/use-outside-click.ts#L66-L72
   *
   * This will add the `data-headlessui-portal` attribute to entire container,
   * so space between particular toasts won't be "clickable" as well.
   *
   * Alternative solution is to add the `data-headlessui-portal` attribute
   * to every single toast element.
   * Example:
   * ```
   *   toast( <ToastContent/>, {
   *     ...
   *     onOpen: ({ toastProps: { toastId } }) => {
   *       document
   *         .getElementById(toastId)
   *         .setAttribute('data-headlessui-portal', '');
   *     },
   *   })
   * ```
   *
   * Not "clickable" area between toasts can look buggy for some app users.
   * However, adding the `data-headlessui-portal` attribute at entire container looks more reliable solution.
   */
  useEffect(() => {
    containerRef.current?.setAttribute('data-headlessui-portal', '');
  }, []);

  return (
    <BaseToastContainer
      ref={containerRef}
      enableMultiContainer={true}
      position={toast.POSITION.BOTTOM_RIGHT}
      autoClose={5000}
      pauseOnHover={true}
      pauseOnFocusLoss={true}
      theme="light"
    />
  );
};

export default memo(ToastContainer);
