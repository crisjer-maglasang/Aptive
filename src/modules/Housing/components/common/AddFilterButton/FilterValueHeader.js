import { useState } from 'react';
import { CustomFormElement } from '@/components';
import { addFsExcludeClass } from '@/lib/utils';
import { DotsHorizontalIcon } from '@heroicons/react/solid';
import PropTypes from 'prop-types';

const FilterValueHeader = ({ setFilterOptions, onClickDelete }) => {
  const [isDeleteMenuOpen, setIsDeleteMenuOpen] = useState(false);

  return (
    <div className="p-2 gap-1 border-b">
      <div className="w-full justify-between inline-flex">
        <div>Filter</div>
        <button
          type="button"
          onClick={() => setIsDeleteMenuOpen(!isDeleteMenuOpen)}
        >
          <DotsHorizontalIcon className="w-5 h-5 relative text-gray-400" />
        </button>
      </div>
      {isDeleteMenuOpen && (
        <button
          type="button"
          onClick={onClickDelete}
          className="absolute right-0 top-8 z-10 bg-white rounded-lg shadow-lg border border-gray-200 py-2.5 px-4 text-sm text-gray-600 hover:bg-gray-200 font-['Inter'] font-normal leading-4 text-left"
        >
          Delete Filter
        </button>
      )}
      <CustomFormElement
        colSpan={3}
        id="filter_value"
        name="filter_value"
        type="text"
        onChange={(event) => setFilterOptions(event.target.value)}
        onKeyDown={() => {}}
        placeholder=""
        className={addFsExcludeClass('pr-10')}
      />
    </div>
  );
};

FilterValueHeader.propTypes = {
  setFilterOptions: PropTypes.func,
  onClickDelete: PropTypes.func,
};

export default FilterValueHeader;
