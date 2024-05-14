import { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  requestPolygonStatisticsAsync,
  requestCreateAsync,
  requestUpdateBoundaryAsync,
  requestDeletePolygonAsync,
  requestUpdateRepsAsync,
  requestRemoveRepsAsync,
  requestClearOutcomesAsync,
  requestActivateAsync,
  requestDeactivateAsync,
  selectStatistics,
  selectPolygonPreview,
  requestTeamPolygonsAsync,
  resetPreview,
} from '@/redux/polygons';
import { requestTeamPinsAsync } from '@/redux/teams';
import { DialogActionButton, DropdownButton, ErrorModal, ConfirmationModal, Loader } from '@/components';
import TeamChoropleth from './TeamChloropleth';
import { TeamPolygons, TeamBoundary } from './layers';
import { LoaderControl } from '../controls';
import { LeafletMap } from '../LeafletMap';
import PolygonDetailsPanel from './PolygonDetailsPanel';
import { polygonLoadingSelector, teamMapLayersLoadingSelector } from '@/redux/loading';
import { selectPolygonError } from '@/redux/errors';
import { round } from 'lodash-es';
import { addPluralS } from '@/lib/utils';
import MapLegend from '../MapLegend/MapLegend';
import { TeamMapContext } from '../../providers/TeamMapProvider';
import { TeamMapControlsBar } from '../TeamMapControlsBar';
import NotLicensedRepsModal from './NotLicensedRepsModal/NotLicensedRepsModal';

const TeamMap = ({
  statistics,
  teamId,
  center,
  boundary,
  repOptions,
  polygonError,
  polygonPreview,
  isMapLoading,
  isPolygonLoading,
  isTeamMapLayersLoading,
  getTeamPolygons,
  createPolygon,
  updateBoundary,
  updateReps,
  removeReps,
  clearOutcomes,
  activatePolygon,
  deactivatePolygon,
  deletePolygon,
  getPolygonStatistics,
  repIds,
  getTeamPins,
  clearPreview,
}) => {
  const [layerChoice, setLayerChoice] = useState(null);
  const [selectedPolygon, setSelectedPolygon] = useState(null);
  const [multipleSelectedPolygons, setMultipleSelectedPolygons] = useState([]);
  const [polygons, setPolygons] = useState([]);
  const [visiblePolygons, setVisiblePolygons] = useState([]);
  const [panelStatistics, setPanelStatistics] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogLoading, setDialogLoading] = useState(false);
  const [loadedReps, setLoadedReps] = useState([]);
  const [openErrorModal, setOpenErrorModal] = useState(false);
  const [chosenReps, setChosenReps] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [confirmModal, setConfirmModal] = useState({ isOpen: false });
  const [restrictedRepsLicenseInfo, setRestrictedRepsLicenseInfo] = useState([]);
  const [canCloseTheModal, setCanCloseTheModal] = useState(true);
  const [viewBoundary, setViewBoundary] = useState(null);

  const { pinMode, setIsPolygons, displayPinsOutcomes, toggleDisplayPinsOutcomes } = useContext(TeamMapContext);

  useEffect(() => {
    if (displayPinsOutcomes && (multipleSelectedPolygons.length > 1 || !multipleSelectedPolygons.length)) {
      toggleDisplayPinsOutcomes();
    }
  }, [multipleSelectedPolygons, displayPinsOutcomes, toggleDisplayPinsOutcomes]);

  useEffect(() => {
    getTeamPolygons({
      team_id: teamId,
      callback: (res) => setPolygons(res),
    });
  }, [getTeamPolygons, teamId]);

  useEffect(() => {
    const currentlyVisiblePolygons =
      repIds.length > 0 && polygons.length > 0
        ? polygons.filter(
          (polygon) => polygon.reps.some((rep) => repIds.includes(rep.rep_id) || repIds.includes(rep.user_id)),
        )
        : polygons;

    setVisiblePolygons(currentlyVisiblePolygons);
  }, [polygons, repIds]);

  useEffect(() => {
    if(!openDialog) {
      setSelectedPolygon(null);
      setMultipleSelectedPolygons([]);
      setLoadedReps([]);
    }
  }, [openDialog]);

  useEffect(() => {
    return () => {
      clearPreview();
      setOpenDialog(false);
    };
  }, [clearPreview]);

  useEffect(() => {
    if (multipleSelectedPolygons.length) {
      const selectedStatistics = Object.entries(statistics)
        .filter(([key, value]) => multipleSelectedPolygons.includes(Number(key)))
        .map(([key, value]) => value);

      const initialStats = {
        percentage: 0,
        totalAddresses: 0,
        qualifiedAddresses: 0,
        totalReps: 0,
        reps: [],
        lastKnocks: [],
      };

      if (selectedStatistics.length) {
        const generalStatistics = selectedStatistics.reduce((acc, item, i, array) => {
          const { totalAddresses, qualifiedAddresses, reps } = item ?? {};
          const uniqueRepsIds = [...new Set(acc.reps.concat(reps))];
          const averagePercentage = array.reduce((acc, item) => acc + item?.percentage, 0) / array.length;

          acc.percentage = round(averagePercentage, 2);
          acc.totalAddresses += totalAddresses;
          acc.qualifiedAddresses += qualifiedAddresses;
          acc.totalReps = uniqueRepsIds.length;
          acc.reps = uniqueRepsIds;
          acc.lastKnocks = multipleSelectedPolygons.length !== 1 ? [] : item.lastKnocks;

          return acc;
        }, initialStats);

        if (generalStatistics) {
          setPanelStatistics(generalStatistics);
          setLoadedReps(generalStatistics?.reps);
        }
      }
    }
  }, [statistics, multipleSelectedPolygons]);

  useEffect(() => {
    if (polygonPreview) {
      setOpenDialog(true);
      setPanelStatistics(polygonPreview);
    }
  }, [polygonPreview]);

  useEffect(() => {
    setDialogLoading(isPolygonLoading);
  }, [isPolygonLoading]);

  useEffect(() => {
    if (polygonError) {
      setErrorMessage(polygonError);
      setOpenDialog(false);
      setOpenErrorModal(true);
    }
  }, [polygonError]);

  useEffect(() => {
    setIsPolygons(Boolean(polygons.length));
  }, [polygons, setIsPolygons]);

  const closeDialog = () => {
    setOpenDialog(false);
  };

  const closeErrorModal = () => {
    setOpenErrorModal(false);
  };

  const openConfirmModal = (modal) => () => {
    setConfirmModal(modal);
  };

  const closeConfirmModal = () => {
    setConfirmModal((prevState) => ({ ...prevState, isOpen: false }));
  };

  const getRepIdList = () => {
    return chosenReps.map((rep) => rep.user_id);
  };

  const handleAssign = () => {
    const idList = getRepIdList();
    setCanCloseTheModal(false);
    updateReps({
      polygon_ids: multipleSelectedPolygons,
      team_id: teamId,
      reps: idList,
      callback: (licensingInformationData, restrictedReps) => {
        const restrictedRepsLicensingInfo = [];
        for(const repId in licensingInformationData) {
          if (!licensingInformationData[repId].has_access_to_work) {
            restrictedRepsLicensingInfo.push(licensingInformationData[repId]);
          }
        }

        const updatedPolygons = polygons.map((polygon) => {
          const restrictedRepsForPolygon = restrictedReps[polygon.polygon_id];

          if (restrictedRepsForPolygon) {
            const updatedReps = chosenReps.filter((rep) => !restrictedRepsForPolygon.includes(rep.user_id));

            return {
              ...polygon,
              reps: updatedReps,
              reps_count: updatedReps.length,
              active: true,
            };
          }

          return polygon;
        });

        setRestrictedRepsLicenseInfo(restrictedRepsLicensingInfo);
        setPolygons(updatedPolygons);
        setOpenDialog(false);
        setCanCloseTheModal(true);
      },
    });
  };

  const handleUnassign = () => {
    setCanCloseTheModal(false);
    removeReps({
      polygon_ids: multipleSelectedPolygons,
      team_id: teamId,
      callback: (unassignedPolygons) => {
        updatePolygonsOnMap({ reps: [], reps_count: 0 }, unassignedPolygons);
        setOpenDialog(false);
        setCanCloseTheModal(true);
      },
    });
  };

  const handleActivatePolygon = () => {
    const idList = getRepIdList();
    setCanCloseTheModal(false);
    activatePolygon({
      polygon_id: selectedPolygon.polygon_id,
      team_id: teamId,
      reps: idList,
      callback: (licensingInformationData, restrictedReps) => {
        const restrictedRepsLicensingInfo = [];
        for(const repId in licensingInformationData) {
          if (!licensingInformationData[repId].has_access_to_work) {
            restrictedRepsLicensingInfo.push(licensingInformationData[repId]);
          }
        }

        let updatedReps = chosenReps;

        if (restrictedReps) {
          const restrictedRepsForPolygon = restrictedReps[selectedPolygon.polygon_id];
          updatedReps = restrictedReps
            ? chosenReps.filter((rep) => !restrictedRepsForPolygon.includes(rep.user_id))
            : chosenReps;
        }

        updatePolygonsOnMap({
          active: true,
          reps: updatedReps,
          reps_count: updatedReps.length,
        });

        setRestrictedRepsLicenseInfo(restrictedRepsLicensingInfo);
        setOpenDialog(false);
        setCanCloseTheModal(true);
      },
    });
  };

  const handleDeactivatePolygon = () => {
    setConfirmModal((prevState) => ({ ...prevState, isOpen: false }));
    setCanCloseTheModal(false);
    deactivatePolygon({
      polygon_ids: multipleSelectedPolygons,
      team_id: teamId,
      callback: (deactivatedPolygons) => {
        updatePolygonsOnMap({ reps: [], reps_count: 0, active: false }, deactivatedPolygons);
        setOpenDialog(false);
        setCanCloseTheModal(true);
      },
    });
  };

  const handleClearOutcomesPolygon = () => {
    setConfirmModal((prevState) => ({ ...prevState, isOpen: false }));
    clearOutcomes({
      polygon_ids: multipleSelectedPolygons,
      team_id: teamId,
      callback: () => {
        if (pinMode) {
          getTeamPins({
            team_id: teamId,
            boundary: viewBoundary,
          });
        }
        setOpenDialog(false);
      },
    });
  };

  const handleDeletePolygon = () => {
    setCanCloseTheModal(false);
    setConfirmModal((prevState) => ({ ...prevState, isOpen: false }));
    deletePolygon({
      polygon_ids: multipleSelectedPolygons,
      team_id: teamId,
      callback: (deletedPolygons) => {
        const remainingPolygons = polygons
          .filter((polygon) => !deletedPolygons.includes(polygon.polygon_id));

        setPolygons(remainingPolygons);
        setOpenDialog(false);
        setCanCloseTheModal(true);
      },
    });
  };

  const handleUpdateBoundary = (updatedPolygon) => {
    setCanCloseTheModal(false);
    updateBoundary({
      team_id: teamId,
      polygon_id: updatedPolygon.polygon_id,
      boundary: updatedPolygon.boundary,
      callback: () => {
        const updatedPolygons = polygons.map((polygon) =>
          (updatedPolygon.polygon_id === polygon.polygon_id ? updatedPolygon : polygon));
        setPolygons(updatedPolygons);
        setCanCloseTheModal(true);
      },
    });
  };

  const updatePolygonsOnMap = (updatedFields, polygonsIds) => {
    const updatedPolygons = polygons.map((polygon) => {
      let isUpdated;

      if (polygonsIds) {
        isUpdated = polygonsIds.includes(polygon.polygon_id);
      } else {
        isUpdated = selectedPolygon?.polygon_id === polygon.polygon_id;
      }

      if (isUpdated) {
        return {
          ...polygon,
          ...updatedFields,
        };
      } else {
        return polygon;
      }
    });
    setPolygons(updatedPolygons);
  };

  const addPolygonToMap = (polygonToAdd) => {
    const newPolygon = {
      ...polygonToAdd,
      reps_count: polygonToAdd.reps.length,
    };
    const newPolygons = [...polygons];
    newPolygons.push(newPolygon);
    setPolygons(newPolygons);
  };

  const handlePolygonSelect = (selected) => {
    setDialogLoading(true);
    setOpenDialog(true);

    // When the choropleth is loaded, there is a delay for the user
    // when clicking polygons due to the getPolygonStatistics call.
    // This timeout sends the api call to the end of the render queue
    // avoud the delay
    setTimeout(() => {
      getPolygonStatistics({
        polygon_id: selected.polygon_id,
      });
    }, 0);
  };

  const getMultiplePolygonStatistics = (polygonId) => {
    getPolygonStatistics({
      polygon_id: polygonId,
    });
  };

  const confirmCreatePolygon = () => {
    setCanCloseTheModal(false);
    createPolygon({
      team_id: parseInt(teamId),
      reps: getRepIdList(),
      boundary: selectedPolygon.geometry,
      callback: (polygon, licensingInformationData) => {
        const restrictedRepsLicensingInfo = [];

        for(const repId in licensingInformationData) {
          if (!licensingInformationData[repId].has_access_to_work) {
            restrictedRepsLicensingInfo.push(licensingInformationData[repId]);
          }
        }

        setRestrictedRepsLicenseInfo(restrictedRepsLicensingInfo);
        addPolygonToMap(polygon);
        setOpenDialog(false);
        setCanCloseTheModal(true);
      },
    });
  };

  const getMultipleSelectedPolygons = () => {
    const multiPolygons = [];

    polygons.forEach((polygon) => {
      if (multipleSelectedPolygons.includes(polygon.polygon_id)) {
        multiPolygons.push(polygon);
      }
    });

    return multiPolygons;
  };

  const getActionButton = () => {
    const polygonsCount = multipleSelectedPolygons.length;

    if(dialogLoading || !selectedPolygon) {
      return;
    } else {
      if(selectedPolygon.isPreview) {
        return (
          <DialogActionButton className={'bg-primary-300'} triggerAction={confirmCreatePolygon} text={'Create Polygon'} disabled={false} />
        );
      } else {
        return (
          <DropdownButton
            options={[
              {
                key: 'updateReps',
                label: 'Update Reps',
                onClick: handleAssign,
              },
              {
                key: 'removeReps',
                label: 'Remove All Reps',
                onClick: handleUnassign,
                isHidden: getMultipleSelectedPolygons().every((polygon) => !polygon.reps_count),
              },
              {
                key: 'clearOutcomes',
                label: 'Clear Outcomes',
                onClick: openConfirmModal({
                  isOpen: true,
                  title: `Are you sure you want to clear all the outcomes in ${polygonsCount > 1 ? 'these polygons' : 'this polygon'}?`,
                  onAction: handleClearOutcomesPolygon,
                  message: `Clearing the outcomes will remove any information that is associated with ${polygonsCount > 1 ? 'them' : 'it'}.`,
                  confirmLabel: 'Clear Outcomes',
                }),
              },
              {
                key: 'activate',
                label: 'Activate Polygon',
                onClick: handleActivatePolygon,
                isHidden: polygonsCount > 1 || getMultipleSelectedPolygons().every((polygon) => polygon.active),
              },
              {
                key: 'deactivate',
                label: `Deactivate ${addPluralS('Polygon', polygonsCount)}`,
                onClick: openConfirmModal({
                  isOpen: true,
                  title: `Are you sure you want to deactivate ${polygonsCount > 1 ? 'these polygons' : 'this polygon'}?`,
                  onAction: handleDeactivatePolygon,
                  message: `Deactivating the ${addPluralS('polygon', polygonsCount)} will remove any reps that are associated with ${polygonsCount > 1 ? 'them' : 'it'}.`,
                  confirmLabel: `Deactivate ${addPluralS('Polygon', polygonsCount)}`,
                }),
                isHidden: getMultipleSelectedPolygons().every((polygon) => !polygon.active),
              },
              {
                key: 'delete',
                label: `Delete ${addPluralS('Polygon', polygonsCount)}`,
                onClick: openConfirmModal({
                  isOpen: true,
                  title: `Are you sure you want to delete ${polygonsCount > 1 ? 'these polygons' : 'this polygon'}?`,
                  onAction: handleDeletePolygon,
                  message: `Deleting the ${addPluralS('polygon', polygonsCount)} will remove any information that is associated with ${polygonsCount > 1 ? 'them' : 'it'}.`,
                  confirmLabel: `Delete ${addPluralS('Polygon', polygonsCount)}`,
                }),
              },
            ]}
          />
        );
      }
    }
  };

  return isMapLoading
    ? <Loader className="w-[800px] h-[800px] flex items-center" />
    : (
      <div className="relative">
        {pinMode && <TeamMapControlsBar />}

        <LeafletMap
          zoom={10}
          center={center}
          onLayerChange={setLayerChoice}
        >
          {isTeamMapLayersLoading && <LoaderControl />}

          <TeamBoundary
            boundary={boundary}
            layerChoice={layerChoice}
          />

          <TeamChoropleth
            teamId={teamId}
            selectedPolygonId={statistics?.[selectedPolygon?.polygon_id]}
            setViewBoundary={setViewBoundary}
          />

          <TeamPolygons
            teamId={teamId}
            polygons={visiblePolygons}
            selectedPolygon={selectedPolygon}
            setSelectedPolygon={setSelectedPolygon}
            multipleSelection={multipleSelectedPolygons}
            selectMultiplePolygons={setMultipleSelectedPolygons}
            closeDialog={closeDialog}
            onPolygonSelect={handlePolygonSelect}
            onPolygonEdit={handleUpdateBoundary}
            getMultiplePolygonStatistics={getMultiplePolygonStatistics}
          />

          <MapLegend />
        </LeafletMap>

        <PolygonDetailsPanel
          dialogTitle={`Selected ${addPluralS('polygon', multipleSelectedPolygons.length)} information`}
          loading={dialogLoading}
          actionButton={getActionButton()}
          open={openDialog}
          statistics={panelStatistics}
          setOpen={setOpenDialog}
          repOptions={repOptions}
          initialChosenReps={loadedReps}
          setChosenReps={setChosenReps}
          canHistoryBeOpened={selectedPolygon && !selectedPolygon.isPreview && multipleSelectedPolygons.length === 1}
          canOutcomesBeShown={
            pinMode && selectedPolygon && !selectedPolygon.isPreview && multipleSelectedPolygons.length === 1
          }
          canCloseTheModal={canCloseTheModal}
        />

        <ConfirmationModal
          isOpened={confirmModal.isOpen}
          modalWidth="max-w-[528px] w-full"
          title={confirmModal?.title}
          onCancel={closeConfirmModal}
          onAction={confirmModal?.onAction}
          message={confirmModal?.message}
          confirmLabel={confirmModal?.confirmLabel}
        />

        <NotLicensedRepsModal
          restrictedRepsLicenseInfo={restrictedRepsLicenseInfo}
          setRestrictedRepsLicenseInfo={setRestrictedRepsLicenseInfo}
        />

        <ErrorModal
          isOpened={openErrorModal}
          onCancel={closeErrorModal}
          message={Array.isArray(errorMessage) ? errorMessage[0]?.message : errorMessage}
        />

        <div>Tip: Hold Cmnd or Ctrl and then click to select multiple polygons</div>
      </div>
    );
};

const mapStateToProps = (state) => ({
  isTeamMapLayersLoading: teamMapLayersLoadingSelector(state),
  isPolygonLoading: polygonLoadingSelector(state),
  statistics: selectStatistics(state),
  polygonPreview: selectPolygonPreview(state),
  polygonError: selectPolygonError(state),
});

const mapDispatchToProps = {
  getPolygonStatistics: requestPolygonStatisticsAsync.request,
  createPolygon: requestCreateAsync.request,
  updateBoundary: requestUpdateBoundaryAsync.request,
  updateReps: requestUpdateRepsAsync.request,
  removeReps: requestRemoveRepsAsync.request,
  activatePolygon: requestActivateAsync.request,
  deactivatePolygon: requestDeactivateAsync.request,
  deletePolygon: requestDeletePolygonAsync.request,
  clearOutcomes: requestClearOutcomesAsync.request,
  getTeamPolygons: requestTeamPolygonsAsync.request,
  getTeamPins: requestTeamPinsAsync.request,
  clearPreview: resetPreview,
};

TeamMap.propTypes = {
  teamId: PropTypes.string,
  center: PropTypes.array,
  boundary: PropTypes.object,
  repOptions: PropTypes.array,
  getPolygonStatistics: PropTypes.func,
  createPolygon: PropTypes.func,
  updateBoundary: PropTypes.func,
  updateReps: PropTypes.func,
  removeReps: PropTypes.func,
  clearOutcomes: PropTypes.func,
  activatePolygon: PropTypes.func,
  deactivatePolygon: PropTypes.func,
  deletePolygon: PropTypes.func,
  statistics: PropTypes.object,
  polygonError: PropTypes.string,
  polygonPreview: PropTypes.object,
  isMapLoading: PropTypes.bool,
  isPolygonLoading: PropTypes.bool,
  isTeamMapLayersLoading:PropTypes.bool,
  getTeamPolygons: PropTypes.func,
  repIds: PropTypes.array,
  getTeamPins: PropTypes.func,
  clearPreview: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(TeamMap);
