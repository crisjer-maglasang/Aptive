import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { connect } from 'react-redux';
import Draggable from 'react-draggable';
import { requestTeamAsync, requestRepsListAsync, teamRepsSelector, repOptionsSelector } from '@/redux/teams';
import { TeamMap } from '../components/TeamMap';
import { ErrorModal } from '@/components';
import { sptConstants } from '../lib';
import { TeamReps } from '../components/TeamReps';
import '../assets/leaflet-custom.css';
import TeamMapProvider from '../providers/TeamMapProvider';

const SalesPlanningTeamDetails = ({
  loading,
  errors,
  teamName,
  getTeam,
  getRepsList,
  repList,
  center,
  boundary,
}) => {
  const teamRepRef = useRef(null);
  const { teamId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [areaId, setAreaId] = useState();
  const [areaName, setAreaName] = useState();
  const [origin, setOrigin] = useState(null);
  const [openErrorModal, setOpenErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [repIds, setRepIds] = useState([]);
  const navigate = useNavigate();

  const handleError = (message) => {
    setErrorMessage(message);
    setOpenErrorModal(true);
  };

  useEffect(() => {
    // Origin parameter indicates breadcrumb change
    // Get breadcrumb information from search parameters
    if(searchParams.get('origin')) {
      setOrigin(searchParams.get('origin'));
      if(searchParams.get('areaId')) {
        setAreaId(searchParams.get('areaId'));
      }
      if(searchParams.get('areaName')) {
        setAreaName(searchParams.get('areaName'));
      }
    }
    getTeam(teamId);
    getRepsList(teamId);
  }, []);

  useEffect(() => {
    if(errors.team) {
      handleError(errors.team);
    }
  }, [errors]);

  const onCloseErrorModal = () => {
    setOpenErrorModal(false);
    navigate('/sales-planning/teams');
  };

  const onRepClick = (selectedRepId) => {
    const currentlySelectedReps = [...repIds];

    if (currentlySelectedReps.includes(selectedRepId)) {
      currentlySelectedReps.splice(currentlySelectedReps.indexOf(selectedRepId), 1);
    } else {
      currentlySelectedReps.push(selectedRepId);
    }

    setRepIds(currentlySelectedReps);
  };

  const onGlobalRepClick = () => {
    let currentlySelectedReps = [...repIds];

    if (currentlySelectedReps.length === 0) {
      currentlySelectedReps = repList.map((rep) => {
        return rep.user_id;
      });
    } else {
      currentlySelectedReps = [];
    }

    setRepIds(currentlySelectedReps);
  };

  return (
    <div className="p-4">
      <div className="mx-3.5">
        <div className="text-sm">
          {!origin &&
            (
              <div>
                <Link to="/sales-planning/teams"><span className="text-primary-300">{sptConstants.VIEW_TEAMS}</span></Link>&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;{teamName}
              </div>
            )
          }

          {origin === 'area' &&
            (
              <div>
                <Link to="/sales-planning"><span className="text-primary-300">{sptConstants.VIEW_AREAS}</span></Link>
                &nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;
                <Link to={`/sales-planning/area/${areaId}`}><span className="text-primary-300">{areaName}</span></Link>
                &nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;
                {teamName}
              </div>
            )
          }

          {origin === 'areaPolygons' &&
            (
              <div>
                <Link to={`/sales-planning/polygons/area/${areaId}`}><span className="text-primary-300">{sptConstants.VIEW_POLYGONS}</span></Link>
                &nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;
                {teamName}
              </div>
            )
          }

          {origin === 'teamPolygons' &&
            (
              <div>
                <Link to={`/sales-planning/polygons/team/${teamId}`}><span className="text-primary-300">{sptConstants.VIEW_POLYGONS}</span></Link>
                &nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;
                {teamName}
              </div>
            )
          }

        </div>
        <div className="text-3xl py-7">
          {teamName}
        </div>
      </div>

      <div className="flow-root">
        <Draggable
          nodeRef={teamRepRef}
          defaultPosition={{ x: 10, y: 244 }}
        >
          <div ref={teamRepRef} className="overflow-visible rounded-lg touch-pan-auto top-0 absolute z-[1100] inline-block align-bottom bg-white text-left shadow-xl">
            <TeamReps
              loading={loading.repsList}
              repList={repList}
              selectedReps={repIds}
              onRepClick={onRepClick}
              onGlobalRepClick={onGlobalRepClick}
            />
          </div>
        </Draggable>
        {
          !errorMessage && (
            <TeamMapProvider>
              <TeamMap
                isMapLoading={loading.team || loading.repsList}
                center={center}
                teamId={teamId}
                repOptions={repList}
                boundary={boundary}
                repIds={repIds}
              />
            </TeamMapProvider>
          )
        }
      </div>

      <ErrorModal
        isOpened={openErrorModal}
        onCancel={onCloseErrorModal}
        message={Array.isArray(errorMessage) ? errorMessage[0]?.message : errorMessage}
      />

    </div>
  );
};

// Redux
const mapStateToProps = (state) => {
  const { loading, teams, errors } = state;
  let teamName;
  let center;
  let boundary;

  if(teams.team) {
    const teamData = teams.team.data;
    teamName = teamData.team_name;
    center = [teamData.center.latitude, teamData.center.longitude];
    boundary = teamData.boundary;
  }

  const repsList = errors.errors.teamReps ? [] : teamRepsSelector(state);
  const repOptions = errors.errors.teamReps ? [] : repOptionsSelector(state);

  return {
    loading: {
      repsList: Boolean(loading?.repsList?.isLoading ?? true),
      team: Boolean(loading?.team?.isLoading ?? true),
    },
    teamName,
    repList: repsList,
    repOptions: repOptions,
    center,
    boundary,
    errors: errors.errors,
  };
};

const mapDispatchToProps = {
  getRepsList: requestRepsListAsync.request,
  getTeam: requestTeamAsync.request,
};

export default connect(mapStateToProps, mapDispatchToProps)(SalesPlanningTeamDetails);
