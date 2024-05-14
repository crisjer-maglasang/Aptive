import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { CustomButton } from '@/components';
import TokensTable from './TokensTable';
import Modal from '@/modules/AdminTools/components/Modal';
import { useApiClientContext } from '../ApiClientContext';

const TokenNotification = () => {
  const { apiClientTokensSelector } = useApiClientContext();

  const clientTokens = useSelector(apiClientTokensSelector);

  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => setIsOpen(false);

  const open = () => setIsOpen(true);

  useEffect(() => {
    if (clientTokens.length > 0) {
      open();
    }
  }, [clientTokens]);

  if (clientTokens.length === 0) {
    return null;
  }

  return (
    <>
      <div className="inline-block m-2" onClick={() => setIsOpen(true)}>
        <CustomButton color={'white'}>See New Tokens</CustomButton>
      </div>
      <Modal {...{ onClose, isOpen }}>
        {clientTokens.map(({ user, new_tokens }) => (
          <TokensTable {...{ user, new_tokens }} key={user.id} />
        ))}
      </Modal>
    </>
  );
};

export default TokenNotification;
