import {
  useEffect,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import AreaZipcodes from './AreaZipcodes';
import AreaDetailsPanel from './AreaDetailsPanel';
import { LeafletMap } from '../LeafletMap';
import { AreasMapControlsBar } from '../AreasMapControlsBar';

const AreaMap = ({
  areaId,
  zipcodes,
  teamsOptions,
  teamColors,
  center,
}) => {
  const zoom = 10;
  const defaultTeam = teamsOptions[0]?.value;
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [zipcodeFeatures, setZipcodeFeatures] = useState(zipcodes);
  const [firstSelectedTeam, setFirstSelectedTeam] = useState(defaultTeam);

  const handleDialogOpen = (open) => {
    setOpenDialog(open);
    if(!open) {
      setSelectedFeatures([]);
    }
  };

  useEffect(() => {
    if(selectedFeatures.length) {
      setOpenDialog(true);
    } else {
      setOpenDialog(false);
    }
  }, [selectedFeatures]);

  const setSelectedTeam = (teamId) => {
    const selectedTeamId = teamId ?? defaultTeam;

    if (selectedTeamId !== firstSelectedTeam) {
      setFirstSelectedTeam(selectedTeamId);
    }
  };

  return (
    <div className="relative">
      <AreasMapControlsBar />

      <LeafletMap
        zoom={zoom}
        center={center}
      >
        <AreaZipcodes
          zoom={zoom}
          zipcodeFeatures={zipcodeFeatures}
          selectedFeatures={selectedFeatures}
          setSelectedFeatures={setSelectedFeatures}
          setFirstSelectedTeam={setSelectedTeam}
          teamColors={teamColors}
        />
      </LeafletMap>

      <AreaDetailsPanel
        open={openDialog}
        setOpen={handleDialogOpen}
        zipcodeFeatures={zipcodeFeatures}
        setZipcodeFeatures={setZipcodeFeatures}
        teamsOptions={teamsOptions}
        teamColors={teamColors}
        selectedFeatures={selectedFeatures}
        firstSelectedTeam={firstSelectedTeam}
        areaId={areaId}
      />
    </div>
  );
};

AreaMap.propTypes = {
  areaId: PropTypes.string,
  zipcodes: PropTypes.array,
  teamsOptions: PropTypes.array,
  teamColors: PropTypes.object,
  center: PropTypes.array,
};

export default AreaMap;
