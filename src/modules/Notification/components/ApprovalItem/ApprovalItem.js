import { memo } from 'react';
import PropTypes from 'prop-types';
import { UserIcon } from '@heroicons/react/outline';
import { useNavigate } from 'react-router-dom';
import ItemContent from '../ItemContent/ItemContent';
import ItemContentWrapper from '../ItemContentWrapper/ItemContentWrapper';

const ApprovalItem = ({ close, content, dateCreated }) => {
  const navigate = useNavigate();

  const navigateToPage = () => {
    navigate('/onboarding/rep-approval');
    close();
  };

  return (
    <ItemContentWrapper
      icon={UserIcon}
      date={dateCreated}
      onClick={navigateToPage}
      isDivider
    >
      {content?.map((item, i) => (
        <ItemContent key={`${item.type}-${i}`} type={item.type} data={item.data} />
      ))}
    </ItemContentWrapper>
  );
};

ApprovalItem.propTypes = {
  close: PropTypes.func,
  content: PropTypes.array,
  dateCreated: PropTypes.string,
};

export default memo(ApprovalItem);
