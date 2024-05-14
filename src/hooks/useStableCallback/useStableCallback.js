import {
  useCallback,
  useRef,
} from 'react';

/**
 * Accepts a given callback, and provides a new callback with a stable reference,
 * which will itself always call the latest version of the provided callback.
 * Useful for dealing with third party components that use stale closures.
 * @param {(...args) => any} callback - the original callback desired to be called
 * @returns A new callback with a stable reference, which when called,
 * calls the latest provided callback
 *
 */
function useStableCallback(callback) {
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  const stableCallback = useCallback((...args) => {
    return callbackRef.current(...args);
  }, []);

  return stableCallback;
}

export default useStableCallback;
