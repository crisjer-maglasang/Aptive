import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { PATH } from '@/modules/Housing/routing/apartmentSetup';
import classNames from 'classnames';

const ComplexWithAddress = ({
  complex,
}) => {
  const navigate = useNavigate();
  const { teamId } = useParams();
  const onViewClick = () => {
    navigate(`${PATH}/team/${teamId}/complex/${complex.id}`);
  };

  return (
    <div
      className={classNames(
        'flex justify-between border-t border-gray-200 p-6',
        { 'bg-gray-100': complex.is_archived },
      )}
    >
      <div className="text-gray-600 w-1/5">{complex.name}</div>
      <div className="font-medium w-3/5">{complex.address.street}</div>
      <button className="text-aptiveblue" onClick={onViewClick}>View</button>
    </div>
  );
};

export default ComplexWithAddress;
