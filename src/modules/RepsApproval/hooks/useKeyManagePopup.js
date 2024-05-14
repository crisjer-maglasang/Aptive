import { useEffect } from 'react';

export const useKeyManagePopup = (popupId, onClose) => {
  const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

  const getElements = () => {
    const popup = document.querySelector(`#${popupId}`);
    let firstFocusableElement;
    let lastFocusableElement;

    if (popup) {
      firstFocusableElement = popup.querySelectorAll(focusableElements)[0];
      const focusableContent = popup.querySelectorAll(focusableElements);

      lastFocusableElement = focusableContent[focusableContent.length - 1];
    }

    return { firstFocusableElement, lastFocusableElement };
  };

  const manageKeys = (first, last, event) => {
    const isTabPressed = event.key === 'Tab' || event.keyCode === 9;
    const isEscPressed = event.key === 'Escape' || event.keyCode === 27;

    if (isTabPressed) {
      if (event.shiftKey) {
        if (document.activeElement === first) {
          last?.focus();
          event.preventDefault();
        }
      } else {
        if (document.activeElement === last) {
          first?.focus();
          event.preventDefault();
        }
      }
    } else if (isEscPressed) {
      onClose();
    }
  };

  useEffect(() => {
    const { firstFocusableElement, lastFocusableElement } = getElements();

    document.querySelector(`#${popupId}`).focus();
    document.addEventListener('keydown', (event) =>
      manageKeys(firstFocusableElement, lastFocusableElement, event));

    return () => {
      document.removeEventListener('keydown', (event) =>
        manageKeys(firstFocusableElement, lastFocusableElement, event));
    };
  }, []);
};
