import { produce } from 'immer';

export const createAction = type => {
  const actionCreator = payload => ({
    type,
    payload,
  });

  actionCreator.toString = () => type;
  actionCreator.type = type;

  return actionCreator;
};

export const createReducer =
  (actionPrefix, initialState, reducerMap) =>
    (
      state = initialState,
      action,
    ) =>
      produce(state, draftState => {
        const reducerFn = reducerMap[action?.type];

        if (reducerFn) {
          return reducerFn({
            state: draftState,
            action,
          });
        }
      });

export const createAsyncAction = baseType => {
  const requestType = `${baseType}_REQUEST`;
  const successType = `${baseType}_SUCCESS`;
  const failureType = `${baseType}_FAILURE`;

  const request = createAction(requestType);
  const success = createAction(successType);
  const failure = createAction(failureType);

  return {
    request,
    success,
    failure,
  };
};
