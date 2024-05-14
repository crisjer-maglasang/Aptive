import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import * as turf from '@turf/turf';
import {
  GeoJSON,
  Tooltip,
  useMapEvents,
} from 'react-leaflet';

import { useStableCallback } from '@/hooks';
import { Freedraw } from '../controls';
import { sptConstants, doPolygonsIntersect, DRAW_MODE } from '../../lib';
import { AreaMapContext } from '../../providers/AreaMapProvider';
import {v4 as uuidv4} from "uuid";

const AreaZipcodes = ({
  zoom,
  zipcodeFeatures,
  selectedFeatures,
  setSelectedFeatures,
  setFirstSelectedTeam,
  teamColors,
}) => {
  const freedrawRef = useRef(null);
  const [mapZoom, setMapZoom] = useState(zoom);
  const [selectorPolygon, setSelectorPolygon] = useState(null);

  const { drawMode, setDrawMode } = useContext(AreaMapContext);

  const map = useMapEvents({
    zoomend: () => {
      if (!map) {
        return;
      };
      setMapZoom(map.getZoom());
    },
  });

  function clearFreedraw() {
    if(freedrawRef.current && freedrawRef.current.size()) {
      freedrawRef.current.clear();
    }
  }

  // Free draw markers handler (the points on polygon drawn)
  const handleMarkersDraw = useCallback((event) => {
    if(freedrawRef.current.size()) {
      // Formats latLgs to turf polygon
      const polygonPointArray = [];
      for(const thisPoint of event.latLngs[0]) {
        polygonPointArray.push([
          thisPoint.lng,
          thisPoint.lat,
        ]);
      }
      const newSelectorPolygon = turf.polygon([polygonPointArray]);
      setSelectorPolygon(newSelectorPolygon);
    }
    // End draw mode
    setDrawMode(DRAW_MODE.EDIT);
  }, []);

  // Free draw handlers
  const drawHandlers = useMemo(() => ({
    markers: handleMarkersDraw,
  }), [handleMarkersDraw]);

  function selectFeaturesFromLasso() {
    const newSelections = [];
    let newFirstSelectedTeam;

    zipcodeFeatures.forEach((thisZipCode) => {
      const intersects = doPolygonsIntersect(thisZipCode.geometry, selectorPolygon);

      if (intersects) {
        newSelections.push(thisZipCode.properties.zip);

        const selectedTeam = thisZipCode.properties.team_id;

        if (selectedTeam === null) {
          return;
        }

        if (newFirstSelectedTeam !== selectedTeam) {
          newFirstSelectedTeam = selectedTeam;
        }
      }
    });

    setSelectedFeatures(newSelections);
    setFirstSelectedTeam(newFirstSelectedTeam);
    clearFreedraw();
  }

  // Polygon Click handler
  function onZipcodeClick(event) {
    const clickedFeature = event.target.feature;
    const clickedZipCode = clickedFeature.properties.zip;
    const clickedZipTeam = clickedFeature.properties.team_id;

    if(event.originalEvent.ctrlKey || event.originalEvent.metaKey) {
      // Ctrl+click appends/unappends to selection
      const newSelections = [...selectedFeatures];
      //If selected, will unselect
      const selected = !selectedFeatures.includes(clickedZipCode);
      if(selected) {
        newSelections.push(clickedZipCode);

        if (newSelections.length === 1) {
          setFirstSelectedTeam(clickedZipTeam);
        }
      } else {
        newSelections.splice(newSelections.indexOf(clickedZipCode), 1);

        if (newSelections.length === 0) {
          setFirstSelectedTeam();
        } else {
          const selectedTeams = [];

          newSelections.forEach((selectedZip) => {
            const selectedFeature = zipcodeFeatures.find(
              (zipcodeFeature) => zipcodeFeature.properties.zip === selectedZip,
            );

            const selectedTeam = selectedFeature.properties.team_id;

            if (selectedTeam && !selectedTeams.includes(selectedTeam)) {
              selectedTeams.push(selectedTeam);
            }
          });

          if (selectedTeams.length === 1) {
            setFirstSelectedTeam(selectedTeams[0]);
          } else if (selectedTeams.length === 0) {
            setFirstSelectedTeam();
          }
        }
      }

      setSelectedFeatures(newSelections);
    } else {
      // Simple click wipes out previous selections and replaces with new one
      if(!selectedFeatures.includes(clickedZipCode)) {
        setSelectedFeatures([clickedZipCode]);
        setFirstSelectedTeam(clickedZipTeam);
      }
    }
  }

  // Determines the color of the zip feature
  function determineColor(feature) {
    const teamId = feature.properties.team_id;
    const color = teamId ? teamColors[teamId] : sptConstants.TEAM_COLOR_UNASSIGNED;

    if(selectedFeatures.includes(feature.properties.zip)) {
      feature.style = {
        fillOpacity: 0.5,
        color: sptConstants.POLYGON_SELECTED,
        weight: 5,
        fillColor: color,
      };
    } else {
      feature.style = {
        fillOpacity: 0.3,
        color: color,
        weight: 2,
        fillColor: color,
      };
    }
  }

  // This is needed since GeoJSON onEachFeature uses stale closures and doesn't use the latest state
  const stableOnZipcodeClick = useStableCallback(onZipcodeClick);
  function onEachFeature(feature, layer) {
    // Event binding for geojson features
    layer.on({
      click: stableOnZipcodeClick,
    });
  }

  useEffect(() => {
    if(freedrawRef.current) {
      // Changes cursor depending on draw mode
      switch(drawMode) {
        case 1:
          freedrawRef.current.map._container.style.cursor = 'crosshair';
          break;
        default:
          freedrawRef.current.map._container.style.cursor = '';
          break;
      }
    }
  }, [drawMode]);

  useEffect(() => {
    if(selectorPolygon !== null) {
      selectFeaturesFromLasso();
    }
  }, [selectorPolygon]);

  useEffect(() => {
    if (drawMode === DRAW_MODE.CREATE) {
      clearFreedraw();
      setSelectedFeatures([]);
      setFirstSelectedTeam();
    }
  }, [drawMode]);

  return (
    <div>
      <Freedraw
        mode={drawMode}
        eventHandlers={drawHandlers}
        ref={freedrawRef}
      />
      {zipcodeFeatures.map((thisZipcode) => {
        let label;
        const zip = thisZipcode.properties.zip;
        const qualifiedAddresses = thisZipcode.properties.qualified_addresses;
        if(zip && qualifiedAddresses) {
          label = `${zip} / ${qualifiedAddresses}`;
        } else {
          label = zip;
        }

        determineColor(thisZipcode);

        return (
          <GeoJSON
            onEachFeature={onEachFeature}
            key={`${thisZipcode.properties.zip}_${uuidv4()}`}
            data={thisZipcode}
            pathOptions={thisZipcode.style}
          >
            {mapZoom >= 11 &&
              (
                <Tooltip className={'rep-bubble-tooltip'} direction="center" opacity={1} permanent>
                  {label}
                </Tooltip>
              )
            }
          </GeoJSON>
        );
      })}
    </div>
  );
};

AreaZipcodes.propTypes = {
  zipcodeFeatures: PropTypes.array,
  selectedFeatures: PropTypes.array,
  setSelectedFeatures: PropTypes.func,
  setFirstSelectedTeam: PropTypes.func,
  teamColors: PropTypes.object,
  center: PropTypes.array,
  zoom: PropTypes.number,
};

export default AreaZipcodes;
