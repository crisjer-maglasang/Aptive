import { useFieldArray, useWatch } from 'react-hook-form';

import Labeled from '@/modules/AdminTools/components/Labeled';
import AddToken from './AddToken';
import TokensTable from './TokensTable';
import { apiClientConstants } from '@/modules/AdminTools/lib/constants';

const { ID, API_TOKENS, API_TOKENS_LABEL, REMOVE_CONFIRM } = apiClientConstants;

const Tokens = () => {
  const tokens = useFieldArray({ name: API_TOKENS });

  const shouldShow = useWatch({ name: ID });

  const append = () => {
    tokens.append({});
  };

  const removeConfirm = (index) => {
    if (!window.confirm(REMOVE_CONFIRM)) {
      return;
    }

    tokens.remove(index);
  };

  if (!shouldShow) {
    return null;
  }

  return (
    <Labeled label={API_TOKENS_LABEL}>
      <TokensTable tokens={tokens.fields} remove={removeConfirm} />
      <AddToken {...{ append }} />
    </Labeled>
  );
};

export default Tokens;
