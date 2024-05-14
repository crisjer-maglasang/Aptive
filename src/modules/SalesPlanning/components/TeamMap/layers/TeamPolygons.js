import {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as turf from '@turf/turf';
import {
  FeatureGroup,
  GeoJSON,
  useMapEvents,
  Pane,
} from 'react-leaflet';
import { LatLng } from 'leaflet';
import { requestPreviewAsync } from '@/redux/polygons';
import { selectPolygonPreviewError } from '@/redux/errors';
import { selectLoadingPolygonPreview } from '@/redux/loading';
import { Freedraw, LoaderControl } from '../../controls';
import RepBubbleCluster from './RepBubbleCluster';
import { DRAW_MODE, sptConstants } from '../../../lib';
import { TeamMapContext } from '../../../providers/TeamMapProvider';

const TeamPolygons = ({
  closeDialog,
  teamId,
  getPreview,
  selectedPolygon,
  setSelectedPolygon,
  polygons,
  onPolygonSelect,
  onPolygonEdit,
  previewError,
  isPreviewLoading,
  selectMultiplePolygons,
  multipleSelection,
  getMultiplePolygonStatistics,
}) => {
  const freedrawRef = useRef(null);
  const [mapPolygons, setMapPolygons] = useState(polygons);
  const [showReps, setShowReps] = useState(false);
  const [concavePolygon, setConcavePolygon] = useState(true);

  const { drawMode, setDrawMode, handleDrawModeChange } = useContext(TeamMapContext);

  const polygonStyle = {
    fillOpacity: 0.5,
    weight: 2,
  };

  const map = useMapEvents({
    zoomend: () => {
      if (!map) {
        return;
      };

      if(map.getZoom() >= 13) {
        setShowReps(true);
      } else {
        setShowReps(false);
      }
    },
  });

  useEffect(() => {
    assignPolygonStyles(polygons);
  }, [polygons]);

  useEffect(() => {
    const isExistingPolygon = selectedPolygon && !selectedPolygon.isPreview;

    if(isExistingPolygon) {
      createEditablePolygon(selectedPolygon);
    } else if(!selectedPolygon){
      clearFreedraw();
    }
  }, [selectedPolygon]);

  useEffect(() => {
    if(previewError) {
      clearFreedraw();
    }
  }, [previewError]);

  useEffect(() => {
    if(freedrawRef.current) {
      // Changes cursor depending on draw mode
      switch(drawMode) {
        case DRAW_MODE.CREATE:
          freedrawRef.current.map._container.style.cursor = 'crosshair';
          break;
        default:
          freedrawRef.current.map._container.style.cursor = '';
          break;
      }
    }

    if (DRAW_MODE.EDIT === drawMode) {
      setConcavePolygon(false);
    } else {
      setConcavePolygon(true);
    }
  }, [drawMode]);

  const assignPolygonStyles = (polygons) => {
    const finalPolygons = [];
    for(const thisPolygon of polygons) {
      const coloredPolygon = { ...thisPolygon };
      if(!thisPolygon.active) {
        coloredPolygon.fillColor = sptConstants.POLYGON_COLOR_DEACTIVATED;
        coloredPolygon.weight = 0.3;
      } else if(thisPolygon.reps_count > 0) {
        coloredPolygon.fillColor = sptConstants.POLYGON_COLOR_ASSIGNED;
        coloredPolygon.weight = 2;
      } else {
        coloredPolygon.fillColor = sptConstants.POLYGON_COLOR_UNASSIGNED;
        coloredPolygon.weight = 2;
      }
      finalPolygons.push(coloredPolygon);
    }

    setMapPolygons(finalPolygons);
  };

  const clearFreedraw = () => {
    if(freedrawRef.current && freedrawRef.current.size()) {
      freedrawRef.current.clear();
    }
  };

  useEffect(() => {
    if (drawMode === DRAW_MODE.CREATE) {
      if (selectedPolygon) {
        clearFreedraw();
        closeDialog();
        setDrawMode(DRAW_MODE.CREATE);
      }
    }
  }, [drawMode]);

  const handleMarkersEdit = useCallback((event, polygon) => {
    // Callback is only called if it is an edit on an existing
    const allowCallback = (freedrawRef.current.size() && event.eventType === 'edit');
    if(allowCallback) {
      const newPolygon = { ...polygon, boundary: formatFreedrawPolygon(event.latLngs[0]).geometry };
      onPolygonEdit(newPolygon);
      setSelectedPolygon(newPolygon);
    }

    setDrawMode(DRAW_MODE.EDIT);
  }, [onPolygonEdit, setDrawMode, setSelectedPolygon]);

  const handlePreviewMarkersEdit = useCallback((event) => {
    // Callback is only called if:
    //  1. The polygon is being edited
    //  2. The polygon is being made for the first time
    //   (making previewPolygon a freedraw component)
    const allowCallback =
      (freedrawRef.current.size() && event.eventType === 'edit') ||
      (event.eventType === 'create' && event.latLngs[0]);

    if(allowCallback) {
      const newPolygon = formatFreedrawPolygon(event.latLngs[0]);
      getPolygonPreview({ ...newPolygon, isPreview: true });
    }

    if(freedrawRef.current.size() || event.eventType === 'clear') {
      setDrawMode(DRAW_MODE.EDIT);
    } else {
      handleDrawModeChange();
    }
  }, []);

  const getPolygonPreview = (polygon) => {
    setSelectedPolygon(polygon);
    getPreview({
      team_id: teamId,
      boundary: polygon.geometry,
    });
  };

  const formatFreedrawPolygon = (latLngs) => {
    const formattedLatLngs = [];
    latLngs.forEach((thisPoint) => {
      formattedLatLngs.push([thisPoint.lng, thisPoint.lat]);
    });

    return turf.polygon([formattedLatLngs]);
  };

  // Creates an editable polygon (which is a FreeDraw component)
  const createEditablePolygon = (polygon) => {
    const coordinates = polygon.boundary.coordinates[0].map((coord) => {
      return new LatLng(coord[1], coord[0]);
    });

    clearFreedraw();
    freedrawRef.current.create(coordinates, {
      ...polygonStyle,
      fillColor: polygon.fillColor,
      fillOpacity: 0,
      color: sptConstants.POLYGON_SELECTED,
      weight: 3,
    });
  };

  return (
    <div>
      {isPreviewLoading && <LoaderControl />}

      <Pane name={'teamPolygons'} style={{ zIndex: 500 }}>
        <Freedraw
          mode={drawMode}
          concavePolygon={concavePolygon}
          eventHandlers={{
            markers: (event) => {
              if(selectedPolygon && !selectedPolygon.isPreview) {
                handleMarkersEdit(event, selectedPolygon);
              } else {
                handlePreviewMarkersEdit(event);
              }
            },
          }}
          ref={freedrawRef}
          color={selectedPolygon ? selectedPolygon?.fillColor : sptConstants.POLYGON_COLOR_UNASSIGNED}
        />

        {mapPolygons && mapPolygons.map((polygon) => {
          if(!selectedPolygon || (selectedPolygon.polygon_id !== polygon.polygon_id)) {
            const selected = multipleSelection.includes(polygon.polygon_id);
            const polygonColor = polygon.fillColor || sptConstants.POLYGON_COLOR_UNASSIGNED;

            const style = {
              ...polygonStyle,
              fillColor: polygonColor,
              fillOpacity: selected ? 0 : polygonStyle.fillOpacity,
              color: selected ? sptConstants.POLYGON_SELECTED : polygonColor,
              weight: selected ? 3 : polygon.weight,
            };

            return (
              <FeatureGroup key={polygon.polygon_id}>
                <GeoJSON
                  pathOptions={style}
                  data={polygon.boundary}
                  eventHandlers={{
                    click: (event) => {
                      const polygonId = polygon.polygon_id;
                      if (multipleSelection.length && (event.originalEvent.ctrlKey || event.originalEvent.metaKey)) {
                        const newSelections = [...multipleSelection];
                        const selected = multipleSelection.includes(polygonId);
                        if(selected) {
                          const remainingSelection = multipleSelection.filter((polygon) => polygon !== polygonId);
                          selectMultiplePolygons(remainingSelection);
                        } else {
                          newSelections.push(polygonId);
                          setSelectedPolygon(polygon);
                          selectMultiplePolygons(newSelections);
                          getMultiplePolygonStatistics(polygonId);
                        }
                      } else {
                        setSelectedPolygon(polygon);
                        onPolygonSelect(polygon);
                        selectMultiplePolygons([polygonId]);
                      }
                    },
                  }}
                >
                  {showReps &&
                    (
                      <RepBubbleCluster
                        reps={polygon.reps}
                        lat={polygon.center_latitude}
                        lng={polygon.center_longitude}
                      />
                    )
                  }
                </GeoJSON>
              </FeatureGroup>
            );
          }
        })
        }
      </Pane>

    </div>
  );
};

const mapStateToProps = (state) => ({
  isPreviewLoading: selectLoadingPolygonPreview(state),
  previewError: selectPolygonPreviewError(state),
});

const mapDispatchToProps = {
  getPreview: requestPreviewAsync.request,
};

TeamPolygons.propTypes = {
  closeDialog: PropTypes.func,
  teamId: PropTypes.string,
  getPreview: PropTypes.func,
  enableLassoControl:  PropTypes.bool,
  selectedPolygon: PropTypes.object,
  setSelectedPolygon: PropTypes.func,
  multipleSelection: PropTypes.array,
  selectMultiplePolygons: PropTypes.func,
  polygons: PropTypes.array,
  onPolygonSelect: PropTypes.func,
  onPolygonEdit: PropTypes.func,
  getMultiplePolygonStatistics: PropTypes.func,
  isPreviewLoading:PropTypes.bool,
  previewError: PropTypes.arrayOf(PropTypes.string),
};

export default connect(mapStateToProps, mapDispatchToProps)(TeamPolygons);
