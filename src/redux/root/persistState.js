import { loadState } from './localStorage';

const persistState = ({ auth = { user: null }, ...rest }) => {
  const { user } = loadState() ?? {};

  const initialState = { ...rest };

  return {
    ...initialState,
    auth: {
      user: user ? { ...user } : null,
    },
  };
};

export default persistState;
