import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { sptConstants } from '../../lib';
import { TeamPanelRow } from '../TeamPanelRow';
import { addFsExcludeClass } from '@/lib/utils';

const TeamRepPanel = ({ rep, selectedReps, onRepClick }) => {
  const [isSelected, setIsSelected] = useState(false);
  const onClick = () => {
    onRepClick(rep.user_id);
  };

  useEffect(() => {
    setIsSelected(selectedReps.includes(rep.user_id) || selectedReps.includes(rep.rep_id));
  }, [rep.rep_id, rep.user_id, selectedReps]);

  return (
    <div className="border-x p-1" onClick={onClick} onTouchStart={onClick}>
      <div className={
        classNames(
          'flow-root hover:cursor-pointer rounded',
          isSelected ? 'bg-blue-50' : '',
        )
      }
      >
        <div className="px-3 py-2">
          <div className="flex items-center justify-between">
            <div className={addFsExcludeClass('text-sm')}>
              {rep.full_name}
            </div>
            <div className={addFsExcludeClass('text-xs text-blue-500')}>
              {isSelected ? 'Deselect' : 'Select'}
            </div>
          </div>
          <div className="text-[0.65rem] pt-2">
            <TeamPanelRow
              label={sptConstants.ASSIGNED_POLYGONS}
              value={rep.assigned_polygons}
            />
            <TeamPanelRow
              label={sptConstants.CURRENT_PINS}
              value={rep.qualified_addresses}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

TeamRepPanel.propTypes = {
  rep: PropTypes.object,
  selectedReps: PropTypes.array,
  onRepClick: PropTypes.func,
};

export default TeamRepPanel;
