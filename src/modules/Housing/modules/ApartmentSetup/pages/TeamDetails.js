import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ArrowCircleLeftIcon } from '@heroicons/react/outline';
import { PATH } from '@/modules/Housing/routing/apartmentSetup';
import { setIsHideMenuAction, teamStatisticSelector } from '@/modules/Housing/redux/apartment';
import { Outlet, useParams } from 'react-router';
import { TeamNav } from '../components';

const TeamDetails = ({ getTeamInfo, setIsHideMenu }) => {
  const navigate = useNavigate();
  const { teamId, complexId } = useParams();
  const teamInfo = getTeamInfo(parseInt(teamId));

  useEffect(() => {
    setIsHideMenu(true);

    return () => {
      setIsHideMenu(false);
    };
  }, [setIsHideMenu]);

  const handleClickBack = () => {
    navigate(PATH);
  };

  return (
    <>
      <div className="w-full flex bg-white border-b border-gray-200 pl-8 pr-8">
        <div className="mt-4 mb-4 mr-8 w-1/5">
          <div onClick={handleClickBack}
               className="text-gray-600 hover:text-gray-900 inline-flex items-center hover:bg-gray-50 hover:cursor-pointer hover:bg-white align-middle">
            <ArrowCircleLeftIcon className="h-6 w-6 mr-2" aria-hidden="true"/>
            <span className="text-sm">Back to Apartment team view</span>
          </div>
        </div>
        <div className="w-3/5">
          <TeamNav teamId={teamId}/>
        </div>
      </div>
      <div className="grow flex max-w-full m-8">
        <div className="w-1/5 border flex flex-col mr-8 rounded-xl bg-white">
          <div className="mr-1 ml-1 p-6 border-b border-gray-200 text-lg font-semibold">
            {`Team: ${teamInfo?.name}`}
          </div>
        </div>
        <div className="w-4/5 flex flex-col border rounded-xl bg-white">
          {!complexId && <Outlet />}
        </div>
      </div>
    </>
  );
};

TeamDetails.propTypes = {
  setIsHideMenu: PropTypes.func,
};

const mapStateToProps = (state) => ({
  getTeamInfo: (teamId) => teamStatisticSelector(state, teamId),
});

const mapDispatchToProps = {
  setIsHideMenu: setIsHideMenuAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(TeamDetails);
