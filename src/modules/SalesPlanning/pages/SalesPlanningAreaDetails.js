import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router';
import { Link, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import Draggable from 'react-draggable';
import { requestAreaMapAsync } from '@/redux/areas-new';
import { requestTeamsListAsync, teamColorsSelector, teamDataSelector, teamOptionsSelector } from '@/redux/teams';
import { AreaMap } from '../components/AreaMap';
import { Loader, ErrorModal } from '@/components';
import { sptConstants } from '../lib';
import { AreaTeams } from '../components/AreaTeams';
import '../assets/leaflet-custom.css';
import AreaMapProvider from '@/modules/SalesPlanning/providers/AreaMapProvider';

const SalesPlanningAreas = ({
  loading,
  areaName,
  getAreaTeams,
  getAreaMap,
  zipcodes,
  center,
  teamData,
  teamsOptions,
  teamColors,
  error,
  errorRedirect,
}) => {
  const teamRepRef = useRef(null);
  const { areaId } = useParams();
  const [openErrorModal, setOpenErrorModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getAreaTeams({
      area_id: areaId,
    })
    getAreaMap(areaId);
  }, []);

  useEffect(() => {
    if(error) {
      setOpenErrorModal(true);
    }
  }, [error]);

  const onCloseErrorModal = () => {
    setOpenErrorModal(false);
    if(errorRedirect) {
      navigate('/sales-planning');
    }
  };

  return (
    <div className="p-4">
      {loading.areaMap ?
        <Loader className="h-[76px] items-center" />
        :
        (
          <div className="mx-3.5">
            <div className="text-sm">
              <Link to="/sales-planning"><span className="text-primary-300">{sptConstants.VIEW_AREAS}</span></Link>&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;{areaName}
            </div>
            <div className="text-3xl py-7">
              {areaName}
            </div>
          </div>
        )
      }
      <div className="flow-root">
        <Draggable
          nodeRef={teamRepRef}
          defaultPosition={{ x: 10, y: 244 }}
        >
          <div ref={teamRepRef} className="overflow-visible rounded-lg touch-pan-auto top-0 absolute z-[1100] inline-block align-bottom bg-white text-left shadow-xl">
            <AreaTeams
              loading={loading.teams || loading.areaMap}
              areaData={{
                areaId: areaId,
                areaName: areaName,
              }}
              teamData={teamData}
            />
          </div>
        </Draggable>
        {loading.areaMap ?
          <Loader className="w-[800px] h-[800px] flex items-center" />
          :
          (
            <AreaMapProvider>
              <AreaMap
                error={error}
                zipcodes={zipcodes}
                center={center}
                areaId={areaId}
                teamsOptions={teamsOptions}
                teamColors={teamColors}
              />
            </AreaMapProvider>
          )
        }
      </div>

      <ErrorModal
        isOpened={openErrorModal}
        onCancel={onCloseErrorModal}
        message={Array.isArray(error) ? error[0]?.message : error}
      />
    </div>
  );
};

// Redux
const mapStateToProps = (state) => {
  const { loading, area, teams, errors } = state;
  const zipcodes = [];
  let areaName;
  let center;

  if(area.areaMap && teams.teamsList) {
    areaName = area.areaMap.area_name;
    const zipcodeData = area.areaMap.boundary.features;
    center = [area.areaMap.center.latitude, area.areaMap.center.longitude];

    if (zipcodeData) {
      for(const thisZipcode of zipcodeData) {
        const coloredFeature = { ...thisZipcode };
        zipcodes.push(coloredFeature);
      }
    }
  }

  let error = null;
  let errorRedirect = false;
  if(errors.errors.teamZips) {
    error = errors.errors.teamZips[0];
  }

  if(errors.errors.teamsList) {
    error = errors.errors.teamsList[0];
    errorRedirect = true;
  }

  return {
    loading: {
      areaMap: loading.areaMap && loading.areaMap.isLoading,
      teams: loading.teams && loading.teams.isLoading,
    },
    error: error,
    errorRedirect,
    areaName,
    zipcodes,
    teamData: errors.errors.teamsList ? [] : teamDataSelector(state),
    teamsOptions: teamOptionsSelector(state),
    teamColors: teamColorsSelector(state),
    center,
  };
};

const mapDispatchToProps = {
  getAreaMap: requestAreaMapAsync.request,
  getAreaTeams: requestTeamsListAsync.request,
};

export default connect(mapStateToProps, mapDispatchToProps)(SalesPlanningAreas);
