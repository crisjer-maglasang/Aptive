import {
  useEffect,
  useState,
} from 'react';
import {
  assignTeamZipsAsync,
  unassignTeamZipsAsync,
} from '@/redux/teams';
import { connect } from 'react-redux';
import { FormElement, Loader, DropdownButton, Dialog } from '@/components';
import { sptConstants } from '../../lib';

const AreaDetailsPanel = ({
  open,
  setOpen,
  loading,
  zipcodeFeatures,
  setZipcodeFeatures,
  selectedFeatures,
  teamsOptions,
  teamColors,
  assignTeamZipsRequest,
  unassignTeamZipsRequest,
  firstSelectedTeam,
}) => {
  const [chosenTeam, setChosenTeam] = useState(firstSelectedTeam);
  const [qualifiedAddressesTotal, setQualifiedAddressesTotal] = useState(0);

  const updateDetailsPanel = () => {
    let total = 0;
    for(const thisFeature of zipcodeFeatures) {
      for(const thisSelection of selectedFeatures) {
        if(thisFeature.properties.zip === thisSelection) {
          total += thisFeature.properties.qualified_addresses;
        }
      }
    }
    setQualifiedAddressesTotal(total);
  };

  useEffect(() => {
    setChosenTeam(firstSelectedTeam);
  }, [firstSelectedTeam]);

  const title =
    <>
      <div className="text-xl">Selected zip information</div>
      <div className="mt-2 flex items-center">
        <span className="grow text-sm text-gray-500">
          <FormElement
            className="grow dialog-action-button"
            value={chosenTeam}
            id="teamsList"
            label={sptConstants.TEAM}
            name="teamsList"
            type="select"
            selectOptions={teamsOptions}
            onChange={setChosenTeam}
          />
        </span>
      </div>
    </>;

  const unassignAction = () => {
    unassignTeamZipsRequest({
      team: chosenTeam,
      zips: selectedFeatures,
      callback: () => {
        updateFeatures(sptConstants.TEAM_COLOR_UNASSIGNED, null);
        setOpen(false);
      },
    });
  };

  const assignAction = () => {
    assignTeamZipsRequest({
      team: chosenTeam,
      zips: selectedFeatures,
      callback: () => {
        updateFeatures(teamColors[chosenTeam], chosenTeam);
        setOpen(false);
      },
    });
  };

  const updateFeatures = (newColor, teamId) => {
    const newZipFeatures = [...zipcodeFeatures];
    for(const thisFeature of newZipFeatures) {
      const featureId = thisFeature.properties.zip;
      if(selectedFeatures.includes(featureId)) {
        const newProperties = { ...thisFeature.properties, team_id: teamId };
        const newStyle = { ...thisFeature.style, color: newColor };
        const newFeature = { ...thisFeature, properties: newProperties, style: newStyle };
        newZipFeatures.splice(newZipFeatures.indexOf(thisFeature), 1, newFeature);
      }
    }
    setZipcodeFeatures(newZipFeatures);
  };

  // Helper function to determine if the user selected zipcodes
  // from multiple teams
  const hideUnassign = () => {
    let teamId = null;
    for(const thisSelection of selectedFeatures) {
      for(const thisZip of zipcodeFeatures) {
        if(thisZip.properties.zip === thisSelection) {
          if(thisZip.properties.team_id === null) {
            continue;
          }

          // Any selection that is unassigned means hide
          if(!thisZip.properties.team_id) {
            return true;
          }

          if (!teamId) {
            // Getting here means that a team_id exists and can be set
            teamId = thisZip.properties.team_id;
          }

          // If there is a different team selected
          if (teamId && (thisZip.properties.team_id !== teamId)) {
            return true;
          }
        }
      }
    }

    // After goung through all selections and teamId was never set
    // means that all selections are unassigned
    return !teamId;
  };

  const getActionButton = () => {
    const options = [
      {
        label: 'Assign',
        onClick: assignAction,
      },
    ];

    if(!hideUnassign()) {
      options.push(
        {
          label: 'Unassign',
          onClick: unassignAction,
        },
      );
    }

    return (
      !loading.teamZips &&
        (
          <DropdownButton
            options={options}
          />
        )
    )
  };

  useEffect(() => {
    if(selectedFeatures.length) {
      updateDetailsPanel();
    }
  }, [selectedFeatures]);

  return (
    <Dialog
      open={open}
      title={title}
      setOpen={setOpen}
      defaultPosition={{ x: 100, y: 300 }}
      actionButton={getActionButton()}
      canBeClosed={true}
    >
      {
        loading.teamZips ?
          <Loader />
          :
          (
            <table className="w-full table-autodivide-y">
              <tbody className="divide-y">
                <tr>
                  <td colSpan={2} className="py-2 text-xl">Information</td>
                </tr>
                <tr>
                  <td className="py-2 text-sm text-gray-500">Qualified Addresses</td>
                  <td className="py-2 text-sm float-right">{new Intl.NumberFormat('en-US').format(qualifiedAddressesTotal)}</td>
                </tr>
              </tbody>
            </table>
          )
      }
    </Dialog>
  );
};

// Redux
const mapStateToProps = ({ loading }) => {
  // Format areas response into rows
  return {
    loading: {
      teamZips: loading.teamZips && loading.teamZips.isLoading,
    },
  };
};

const mapDispatchToProps = {
  assignTeamZipsRequest: assignTeamZipsAsync.request,
  unassignTeamZipsRequest: unassignTeamZipsAsync.request,
};

export default connect(mapStateToProps, mapDispatchToProps)(AreaDetailsPanel);
