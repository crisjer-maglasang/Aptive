import { useEffect, useState } from 'react';
import L from 'leaflet';
import { useMap } from 'react-leaflet';
import * as PIXI from 'pixi.js';
import 'leaflet-pixi-overlay';
import { getPinIcon } from '../../lib';
import { connect } from 'react-redux';
import { teamPinsStyledSelector } from '@/redux/teams';

PIXI.settings.FAIL_IF_MAJOR_PERFORMANCE_CAVEAT = false;
PIXI.utils.skipHello();
const PIXILoader = PIXI.Loader.shared;

const PixiOverlay = ({ setLoading, markers }) => {
  const [openedPopupData, setOpenedPopupData] = useState(null);
  const [openedTooltipData, setOpenedTooltipData] = useState(null);

  const [openedPopup, setOpenedPopup] = useState(null);
  const [openedTooltip, setOpenedTooltip] = useState(null);

  const [pixiOverlay, setPixiOverlay] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const map = useMap();

  if (map.getZoom() === undefined) {
    // this if statment is to avoid getContainer error
    // map must have zoom prop
    console.error('no zoom found, add zoom prop to map to avoid getContainer error');
  }

  const determineMarkerScale = (scale) => {
    return scale >= 32 ? scale * 2 : 48;
  };

  // load sprites
  useEffect(() => {
    // cancel loading if already loading as it may cause: Error: Cannot add resources while the loader is running.
    if (PIXILoader.loading) {
      PIXILoader.reset();
    }

    let loadingAny = false;
    for (const marker of markers) {
      const resolvedMarkerId = marker?.iconId || `${marker.iconStyles.stroke}-${marker.iconStyles.fill}`;

      // skip if no ID or already cached
      if (
        (!marker.iconStyles?.fill && !marker?.iconId) ||
        PIXILoader.resources[`marker_${resolvedMarkerId}`]
      ) {
        continue;
      }
      loadingAny = true;

      PIXILoader.add(
        `marker_${resolvedMarkerId}`,
        marker?.customIcon ?? getPinIcon(marker.iconStyles),
      );
    }
    if (loaded && loadingAny) {
      setLoaded(false);
    }

    if (loadingAny) {
      PIXILoader.load(() => setLoaded(true));
    } else {
      setLoaded(true);
    }
  }, [markers]);

  // load pixi when map changes
  useEffect(() => {
    const pixiContainer = new PIXI.Container();
    const overlay = L.pixiOverlay((utils) => {
      // redraw markers
      const scale = determineMarkerScale(utils.getScale());
      utils
        .getContainer()
        .children.forEach((child) => child.scale.set(1 / (scale)));

      utils.getRenderer().render(utils.getContainer());
    }, pixiContainer);
    overlay.addTo(map);
    setPixiOverlay(overlay);

    setOpenedPopupData(null);
    setOpenedTooltipData(null);

    return () => pixiContainer.removeChildren();
  }, [map]);

  useEffect(() => {
    setLoading(loaded);
  }, [loaded]);

  // draw markers first time in new container
  useEffect(() => {
    if (pixiOverlay && markers && loaded) {
      const utils = pixiOverlay.utils;
      const container = utils.getContainer();
      const renderer = utils.getRenderer();
      const project = utils.latLngToLayerPoint;
      const scale = determineMarkerScale(utils.getScale());

      markers.forEach((marker) => {
        const {
          id,
          iconStyles,
          iconId,
          onClick,
          position,
          popup,
          tooltip,
          popupOpen,
          markerSpriteAnchor,
        } = marker;

        const resolvedIconId = iconId || `${iconStyles.stroke}-${iconStyles.fill}`;

        if (
          !PIXILoader.resources[`marker_${resolvedIconId}`] ||
          !PIXILoader.resources[`marker_${resolvedIconId}`].texture
        ) {
          return;
        }

        const markerTexture =
          PIXILoader.resources[`marker_${resolvedIconId}`].texture;
        //const markerTexture = new PIXI.Texture.fromImage(url)

        markerTexture.anchor = { x: 0.5, y: 1 };

        const markerSprite = PIXI.Sprite.from(markerTexture);
        if (markerSpriteAnchor) {
          markerSprite.anchor.set(markerSpriteAnchor[0], markerSpriteAnchor[1]);
        } else {
          markerSprite.anchor.set(0.5, 1);
        }

        const markerCoords = project(position);
        markerSprite.x = markerCoords.x;
        markerSprite.y = markerCoords.y;

        markerSprite.scale.set(1 / scale);

        if (popupOpen) {
          setOpenedPopupData({
            id,
            offset: [0, -35],
            position,
            content: popup,
            onClick,
          });
        }

        if (popup || onClick || tooltip) {
          markerSprite.interactive = true;
        }

        if (popup || onClick) {
          // Prevent accidental launch of onClick event when dragging the map.
          // Detect very small moves as clicks.
          markerSprite.on('mousedown', () => {
            let moveCount = 0;
            markerSprite.on('mousemove', () => {
              moveCount++;
            });
            markerSprite.on('mouseup', (event) => {
              if (moveCount < 2 && onClick) {
                onClick(event);
              }
            });
          });
          // Prevent the same thing on touch devices.
          markerSprite.on('touchstart', () => {
            let moveCount = 0;
            markerSprite.on('touchmove', () => {
              moveCount++;
            });
            markerSprite.on('touchend', (event) => {
              if (moveCount < 10 && onClick) {
                onClick(event);
              }
            });
          });

          markerSprite.defaultCursor = 'pointer';
          markerSprite.buttonMode = true;
        }

        if (tooltip) {
          markerSprite.on('mouseover', () => {
            setOpenedTooltipData({
              id,
              offset: [0, -35],
              position,
              content: tooltip,
            });
          });

          markerSprite.on('mouseout', () => {
            setOpenedTooltipData(null);
          });
        }

        container.addChild(markerSprite);
      });

      renderer.render(container);
    }

    return () =>
      pixiOverlay && pixiOverlay.utils.getContainer().removeChildren();
  }, [pixiOverlay, markers, loaded]);

  // handle tooltip
  useEffect(() => {
    if (openedTooltip) {
      map.removeLayer(openedTooltip);
    }

    if (
      openedTooltipData &&
      (!openedPopup ||
        !openedPopupData ||
        openedPopupData.id !== openedTooltipData.id)
    ) {
      setOpenedTooltip(openPopup(map, openedTooltipData));
    }

    // we don't want to reload when openedTooltip changes as we'd get a loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openedTooltipData, openedPopupData, map]);

  // handle popup
  useEffect(() => {
    // close only if different popup
    if (openedPopup) {
      map.removeLayer(openedPopup);
    }

    // open only if new popup
    if (openedPopupData) {
      setOpenedPopup(
        openPopup(map, openedPopupData, { autoClose: false }, true),
      );
    }
    // we don't want to reload when whenedPopup changes as we'd get a loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openedPopupData, map]);

  const openPopup = (map, data, extraOptions = {}, isPopup) => {
    const popup = L.popup(Object.assign({ offset: data.offset }, extraOptions))
      .setLatLng(data.position)
      .setContent(data.content)
      .addTo(map);

    // TODO don't call onClick if opened a new one
    if (isPopup && data.onClick) {
      popup.on('remove', () => {
        data.onClick(null);
      });
    }

    return popup;
  };

  return null;
};

const mapStateToProps = (state, { heatMap, isPinMode, isPinOutcomesMode, selectedPolygon }) => ({
  markers: isPinOutcomesMode ? teamPinsStyledSelector(state, heatMap, selectedPolygon) : isPinMode ? teamPinsStyledSelector(state, heatMap) : [],
});

export default connect(mapStateToProps, null)(PixiOverlay);
