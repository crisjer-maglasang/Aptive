import { SearchIcon } from '@heroicons/react/solid';
import { dashboardConstants } from '@/lib';

const AgreementSearchAdd = ({
  searchText,
  onSearchTextChanged,
  onAddNewClick,
}) => {
  const handleSearchTextChanged = (e) => {
    onSearchTextChanged(e.target.value);
  };

  const { SEARCH, ADD_NEW } = dashboardConstants;

  return (
    <div className="-ml-4 -mt-2 flex items-center justify-between flex-wrap sm:flex-nowrap">
      <div className="ml-4 mt-2">
        <div className="w-full">
          <label htmlFor="search" className="sr-only">
            {SEARCH}
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
              <SearchIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </div>
            <input
              id="search"
              name="search"
              className="block w-full bg-white border border-gray-300 rounded-md py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:outline-none focus:text-gray-900 focus:placeholder-gray-400 focus:ring-1 focus:ring-aptivegreen focus:border-indigo-500 sm:text-sm"
              placeholder={SEARCH}
              type="search"
              onChange={handleSearchTextChanged}
              value={searchText}
            />
          </div>
        </div>
      </div>
      <div className="ml-4 mt-2 flex-shrink-0">
        <button
          type="button"
          className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-aptivegreen hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-aptivegreen"
          onClick={onAddNewClick}
        >
          {ADD_NEW}
        </button>
      </div>
    </div>
  );
};

export default AgreementSearchAdd;
