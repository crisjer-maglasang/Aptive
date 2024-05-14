import { Popover, Transition } from '@headlessui/react';
import { Fragment, useContext, useRef } from 'react';
import { MapLegendIcon } from '@/components/common';
import { prepareTeamMapLegendData, sptConstants } from '../../lib';
import { TeamMapContext } from '../../providers/TeamMapProvider';
import MapLegendItem from './MapLegendItem';
import LegendKey from './LegendKey';
import PinLegend from './PinLegend';
import ActiveCustomer from '../../assets/aptive.svg';
import Mover from '../../assets/mover.svg';
import Refinanced from '../../assets/refinanced.svg';
import Skull from '../../assets/skull.svg';
import Cross from '../../assets/cross.svg';

const MapLegend = () => {
  const buttonRef = useRef(null);
  const timeoutDuration = 200;
  let timeout;

  const {
    pinMode,
    heatMap,
    isPolygons,
    displayPins,
    isPinsScoreMode,
    displayPinsOutcomes,
  } = useContext(TeamMapContext);

  const mapLegendContent = prepareTeamMapLegendData(heatMap, pinMode, isPolygons, isPinsScoreMode);

  const closePopover = () => {
    return buttonRef.current?.dispatchEvent(
      new KeyboardEvent('keydown', {
        key: 'Escape',
        bubbles: true,
        cancelable: true,
      }),
    );
  };

  const onMouseEnter = (open) => () => {
    clearTimeout(timeout);
    if (open) {
      return;
    }

    return buttonRef.current?.click();
  };

  const onMouseLeave = (open) => () => {
    if (!open) {
      return;
    }
    timeout = setTimeout(() => closePopover(), timeoutDuration);
  };

  return (
    <Popover>
      {({ open }) => {
        return !mapLegendContent.isPolygons && !displayPins && pinMode
          ? null
          : (
            <>
              <Popover.Button
                ref={buttonRef}
                className="absolute bottom-[26px] right-[70px] z-[800] bg-clip-padding border-2 border-black/20 bg-white hover:bg-gray-50 rounded outline-none"
                onMouseEnter={onMouseEnter(open)}
                onMouseLeave={onMouseLeave(open)}
              >
                <div className="w-11 h-11 bg-white rounded flex items-center justify-center">
                  <MapLegendIcon className="w-7 h-7" />
                </div>

              </Popover.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel static className="absolute right-[70px] bottom-[100px] z-[800] min-w-[366px] max-w-[534px]">
                  <div
                    className="bg-white rounded-lg p-6 relative"
                    onMouseEnter={onMouseEnter(open)}
                    onMouseLeave={onMouseLeave(open)}
                  >
                    <div className="absolute right-[14px] -bottom-[7px] w-5 h-5 bg-white rounded-sm rotate-45 z-[-1]" />

                    {/*Pins or Heat map legend*/}
                    {((!displayPins && pinMode) || mapLegendContent.legend.length === 0)
                      ? null
                      : (
                        <MapLegendItem
                          title={pinMode ? 'Pins' : mapLegendContent.title}
                          isDivider={mapLegendContent.isPolygons}
                        >
                          {mapLegendContent.legend.map((item) => (
                            <LegendKey
                              key={item.legend}
                              name={item.legend}
                              style={pinMode ? { background: item.fill, border: `1px solid ${item.stroke}` } : { background: item.fillColor }}
                            />
                          ))}
                        </MapLegendItem>
                      )}

                    {/*Polygons legend*/}
                    {mapLegendContent.isPolygons && (
                      <MapLegendItem title="Polygons" isDivider={displayPins && mapLegendContent?.isIcons}>
                        {sptConstants.POLYGONS.map((item) => (
                          <LegendKey
                            key={item.legend}
                            name={item.legend}
                            style={{ background: item.color }}
                          />
                        ))}
                      </MapLegendItem>
                    )}

                    {/*Map icons legend*/}
                    {(displayPins && mapLegendContent.isIcons) && (
                      <MapLegendItem title="Icons" isDivider={displayPinsOutcomes}>
                        <LegendKey
                          key={sptConstants.NEW_MOVER}
                          name={sptConstants.NEW_MOVER}
                          image={Mover}
                        />
                        <LegendKey
                          key={sptConstants.RECENTLY_REFINANCED}
                          name={sptConstants.RECENTLY_REFINANCED}
                          image={Refinanced}
                        />
                        <LegendKey
                          key={sptConstants.PREVIOUS_CUSTOMER}
                          name={sptConstants.PREVIOUS_CUSTOMER}
                          image={ActiveCustomer}
                        />
                        <LegendKey
                          key={sptConstants.PIN_LEGEND_BLACK}
                          name={sptConstants.PIN_LEGEND_BLACK}
                          image={Skull}
                        />
                        <LegendKey
                          key={sptConstants.PIN_LEGEND_RED_FLAG}
                          name={sptConstants.PIN_LEGEND_RED_FLAG}
                          image={Cross}
                        />
                      </MapLegendItem>
                    )}

                    {/*Pin outcome icons legend*/}
                    {(displayPins && displayPinsOutcomes) && (
                      <MapLegendItem title="Pins">
                        {sptConstants.OUTCOME_PINS.map((item) => (item.legend ? (
                          <PinLegend
                            key={item.legend}
                            name={item.legend}
                            item={item}
                            type="outcome"
                          />
                        ) : null))}
                      </MapLegendItem>
                    )}

                  </div>
                </Popover.Panel>
              </Transition>
            </>
          );
      }}
    </Popover>
  );
};

export default MapLegend;
