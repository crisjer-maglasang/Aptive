import { UserActionButton } from '@/components/common';
import PropTypes from 'prop-types';
import { memo } from 'react';

const Actions = ({
  isPersonalWizard,
  isAdmin,
  userId,
  onUserDeleted,
}) => (
  <>
    {(isAdmin && !isPersonalWizard) && (
      <div className="border-t px-6 text-sm">
        <UserActionButton onActionCompleted={onUserDeleted} userId={userId} type="delete" color={'red_transparent'} />
      </div>
    )}
  </>
);

Actions.propTypes = {
  isPersonalWizard: PropTypes.bool.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  userId: PropTypes.number,
  onUserDeleted: PropTypes.func,
};

export default memo(Actions);
