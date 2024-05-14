import {
  useState,
  useEffect,
  useContext,
} from 'react';

import { Dialog, Icon, Loader } from '@/components';
import { MultiSelectDropdown } from '@/components/common/inputs';
import { sptConstants } from '../../lib';
import PropTypes from 'prop-types';
import { TeamMapContext } from '@/modules/SalesPlanning/providers/TeamMapProvider';
import ToggleControl from '@/modules/SalesPlanning/components/controls/ToggleControl';

const PolygonDetailsPanel = ({
  open,
  setOpen,
  loading,
  repOptions,
  initialChosenReps,
  setChosenReps,
  statistics,
  actionButton,
  dialogTitle,
  canHistoryBeOpened,
  canOutcomesBeShown,
  canCloseTheModal,
}) => {
  const { displayPinsOutcomes, toggleDisplayPinsOutcomes } = useContext(TeamMapContext);
  const [showKnockHistory, setShowKnockHistory] = useState(false);

  useEffect(() => {
    if (!open) {
      setShowKnockHistory(false);
    }
  }, [open]);

  useEffect(() => {
    if (!canHistoryBeOpened) {
      setShowKnockHistory(false);
    }
  }, [canHistoryBeOpened]);

  const showHistory = () => {
    setShowKnockHistory(true);
  };

  const hideHistory = () => {
    setShowKnockHistory(false);
  };

  const title = showKnockHistory
    ? (
      <div className="text-xl">{dialogTitle}</div>
    )
    : (
      <>
        <div className="text-xl">{dialogTitle}</div>
        <span className="mt-2 block items-center">
          <span className="grow text-sm text-gray-500">
            {!loading &&
              <MultiSelectDropdown
                items={repOptions}
                label={sptConstants.REPS}
                idProp="user_id"
                displayProp="full_name"
                initialSelections={initialChosenReps}
                setSelected={setChosenReps}
              />
            }
          </span>
        </span>
      </>
    );

  const statisticsContent = (statistics) => {
    return (
      <table className="w-full table-autodivide-y">
        <tbody className="divide-y">
          <tr>
            <td className="py-2 text-xl">Information</td>
            <td className="py-2 float-right"></td>
          </tr>
          {canOutcomesBeShown && (
            <tr>
              <td className="py-2 text-sm text-gray-500">
                <div className="mb-0.5">
                  <Icon
                    id="percentage"
                    icon="info"
                    message="Toggle on to show knock outcomes for selected polygon."
                    place="right"
                    tooltipClassName="w-64 overflow-auto"
                    className="absolute"
                  />
                </div>
                <div className="ml-8">
                  {sptConstants.DISPLAY_OUTCOMES}
                </div>
              </td>
              <td className="py-2 text-sm float-right">
                <div className="px-2 py-1.5 flex items-center justify-end gap-x-2">
                  <ToggleControl
                    checked={displayPinsOutcomes}
                    name={sptConstants.DISPLAY_OUTCOMES}
                    onChange={toggleDisplayPinsOutcomes}
                  />
                </div>
              </td>
            </tr>
          )}
          <tr>
            <td className="py-2 text-sm text-gray-500">
              <div className="mb-0.5">
                <Icon
                  id="percentage"
                  icon="info"
                  message="Percentage of qualified addresses compared to total addresses in this polygon."
                  place="right"
                  tooltipClassName="w-64 overflow-auto"
                  className="absolute"
                />
              </div>
              <div className="ml-8">
                {sptConstants.QUALIFIED_PERCENTAGE}
              </div>
            </td>
            <td className="py-2 text-sm float-right">
              <div className="mt-0.5">
                {statistics.percentage || 0}
              </div>
            </td>
          </tr>
          <tr>
            <td className="py-2 text-sm text-gray-500">
              <div className="mb-0.5">
                <Icon
                  id="qualified_addresses"
                  icon="info"
                  message="Number of qualified addresses that fall within the selected boundary."
                  place="right"
                  tooltipClassName="w-64 overflow-auto"
                  className="absolute"
                />
              </div>
              <div className="ml-8">
                {sptConstants.QUALIFIED_ADDRESSES}
              </div>
            </td>
            <td className="py-2 text-sm float-right">
              <div className="mt-0.5">
                {statistics.qualifiedAddresses || 0}
              </div>
            </td>
          </tr>
          <tr>
            <td className="py-2 text-sm text-gray-500">
              <div className="mb-0.5">
                <Icon
                  id="qualified_addresses"
                  icon="info"
                  message="Number of addresses that fall within the selected boundary."
                  place="right"
                  tooltipClassName="w-64 overflow-auto"
                  className="absolute"
                />
              </div>
              <div className="ml-8">
                {sptConstants.TOTAL_ADDRESSES}
              </div>
            </td>
            <td className="py-2 text-sm float-right">
              <div className="mt-0.5">
                {statistics.totalAddresses || 0}
              </div>
            </td>
          </tr>
          <tr>
            <td className="py-2 text-sm text-gray-500">
              <div className="mb-0.5">
                <Icon
                  id="reps_assigned"
                  icon="info"
                  message="Current reps assigned to the selected polygon"
                  place="right"
                  tooltipClassName="w-64 overflow-auto"
                  className="absolute"
                />
              </div>
              <div className="ml-8">
                {sptConstants.TOTAL_REPS}
              </div>
            </td>
            <td className="py-2 text-sm float-right">
              <div className="mt-0.5">
                {statistics.totalReps || 0}
              </div>
            </td>
          </tr>
          {canHistoryBeOpened && (
            <tr>
              <td colSpan="2" className="py-2 text-sm text-blue-500 text-right hover:cursor-pointer">
                <div className="mb-0.5" onClick={showHistory}>
                  Last knocked history
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    );
  };

  const knockHistoryContent = (lastKnocks) => {
    const knocks = [];

    lastKnocks.forEach((knock, key) => {
      knocks.push((
        <tr className={key % 2 === 0 ? 'bg-gray-100' : ''} key={key}>
          <td className="py-3">
            {knock.rep_full_name}
          </td>
          <td className="py-3 text-right">
            {knock.knocked_at}
          </td>
        </tr>
      ));
    });

    return (
      <table className="w-full table-autodivide-y mb-[6.8rem]">
        <tbody className="divide-y text-sm">
          <tr className="bg-gray-100">
            <td colSpan="2" className="py-2">
              <span className="text-blue-500 hover:cursor-pointer pr-3" onClick={hideHistory}>Go Back</span><span> / </span><span className="pl-3">Knock history</span>
            </td>
          </tr>
          <tr className="font-semibold text-xs">
            <td className="py-3">
              Name
            </td>
            <td className="py-3 text-right">
              Date and time
            </td>
          </tr>
          {knocks.length > 0
            ? knocks
            : (
              <tr className="bg-gray-100">
                <td colSpan="2" className="py-3">History is empty</td>
              </tr>
            )}
        </tbody>
      </table>
    );
  };

  return (
    <div>
      <Dialog
        open={open}
        title={title}
        setOpen={setOpen}
        actionButton={actionButton}
        defaultPosition={{ x: 100, y: 300 }}
        canBeClosed={canCloseTheModal}
      >
        {(loading || !statistics)
          ? <Loader />
          : showKnockHistory ? knockHistoryContent(statistics.lastKnocks) : statisticsContent(statistics)
        }
      </Dialog>
    </div>
  );
};

PolygonDetailsPanel.propTypes = {
  canHistoryBeOpened: PropTypes.bool,
  canOutcomesBeShown: PropTypes.bool,
  canCloseTheModal: PropTypes.bool,
  statistics: PropTypes.oneOfType(
    [
      PropTypes.shape({
        percentage: PropTypes.number,
        qualifiedAddresses: PropTypes.number,
        totalAddresses: PropTypes.number,
        totalReps: PropTypes.number,
      }),
      PropTypes.instanceOf(null),
    ],
  ),
};

export default PolygonDetailsPanel;
