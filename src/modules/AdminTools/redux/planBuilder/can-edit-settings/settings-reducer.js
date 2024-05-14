import { createReducer } from '@/redux/root';
import { NAME } from './settings-selector';

export const settingsReducer = (namespace, actions, baseReducer = {}) => {
  const {
    updateAsync,
    createAsync,
    removeAsync,
    requestsAsync,
  } = actions;

  return createReducer(
    namespace,
    {},
    {
      [updateAsync.success]: ({ state, action: { payload } }) => {
        state[NAME].forEach(({ id }, index) => {
          if (id === payload.id) {
            state[NAME][index] = payload;
          }
        });
      },
      [createAsync.success]: ({ state, action: { payload } }) => {
        state[NAME].push(payload);
      },
      [removeAsync.success]: ({ state, action: { payload } }) => {
        state[NAME] = state[NAME].filter(({ id }) => id !== payload);
      },
      [requestsAsync.success]: ({ state, action: { payload } }) => {
        state[NAME] = payload;
      },
      ...baseReducer,
    }
  );
};
