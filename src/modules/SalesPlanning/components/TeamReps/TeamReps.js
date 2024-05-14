import TeamRepPanel from './TeamRepPanel';
import PropTypes from 'prop-types';
import { Loader } from '@/components';

const TeamReps = ({ loading, repList, selectedReps, onRepClick, onGlobalRepClick }) => {
  return (
    <div>
      <div className="flex items-center justify-between h-[41px] rounded-t-lg border-x border-b p-2.5 pt-3">
        <div className="text-sm pl-1.5">
          Reps <span className="text-gray-600 text-xs">{selectedReps.length > 0 ? `${selectedReps.length} selected` : ''}</span>
        </div>
        <div className="text-[0.8rem] pr-1.5">
          <div onClick={onGlobalRepClick} onTouchStart={onGlobalRepClick} className="text-blue-500 hover:cursor-pointer">
            {selectedReps.length === 0 ? 'Select all' : 'Deselect all'}
          </div>
        </div>
      </div>
      <div className="w-[280px] max-h-[574px] rounded-b-lg overflow-auto">
        {loading ?
          <Loader className="my-3.5" />
          :
          repList && repList.map((rep) => {
            return (
              <TeamRepPanel
                key={rep.user_id}
                rep={rep}
                selectedReps={selectedReps}
                onRepClick={onRepClick}
              />
            );
          })
        }
      </div>
    </div>
  );
};

TeamReps.propTypes = {
  loading: PropTypes.bool,
  repList: PropTypes.array,
  selectedReps: PropTypes.array,
  onRepClick: PropTypes.func,
  onGlobalRepClick: PropTypes.func,
};

export default TeamReps;
