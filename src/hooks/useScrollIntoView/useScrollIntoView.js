import { animate } from 'popmotion';
import { useEffect } from 'react';
import scrollIntoView from 'scroll-into-view-if-needed';

const useScrollIntoView = (ref, boundary, onComplete) => {
  /**
   * Omit dependency array and run the effect after every single render.
   *
   * As the `ref.current` supposed to be a DOM element, it is not mounted yet at the moment when React calculates
   * whether an effect should be run on the upcoming render.
   *
   * So if we'll add a `ref.current` as a dependency of the effect,
   * it will refer to a value from a previous render, which is wrong!
   *
   * We can to know the true value of the `ref.current` only after DOM element is mounted,
   * i.e. at the moment when an effect is actually run.
   */
  useEffect(() => {
    if (!ref?.current) {
      return;
    }

    scrollIntoView(ref.current, {
      block: 'start',
      boundary: boundary,
      behavior: (actions) => actions.forEach(({ el, top, left }) => {
        Promise.all([
          new Promise((resolve) => {
            animate({
              from: el.scrollTop,
              to: top,
              onUpdate: (top) => el.scrollTop = top,
              onComplete: resolve,
            });
          }),
          new Promise((resolve) => {
            animate({
              from: el.scrollLeft,
              to: left,
              onUpdate: (left) => el.scrollLeft = left,
              onComplete: resolve,
            });
          }),
        ]).then(() => {
          onComplete && onComplete();
        });
      }),
    });
  });
};

export default useScrollIntoView;
