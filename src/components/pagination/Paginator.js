import { FormElement, FormTextInput, PaginatorButton } from '@/components';
import { mergeClassName } from '@/lib';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/solid';

const pageSizeOptions = [
  { name: '10 rows', value: '10' },
  { name: '25 rows', value: '25' },
  { name: '50 rows', value: '50' },
  { name: '100 rows', value: '100' },
];

const Paginator = ({
  rowCount,
  pageSize,
  selectedPage,
  initialPage,
  setPageSize,
  onPageChange, // TODO: get rid of this in favor of the `setSelectedPage`, because all existing implementations seems to be the same.
  isDisabled,
  className,
}) => {
  const [currentPage, setCurrentPage] = useState(selectedPage);

  // Sync inner state with outer if the last one has changed.
  useEffect(() => {
    setCurrentPage(selectedPage);
  }, [selectedPage]);

  let rowStart = 0;
  let rowEnd = 0;
  let pageCount = 1;

  // Default is 10 if no page size is given
  let selectedPageSize = parseInt(pageSize);
  if (!selectedPageSize) {
    selectedPageSize = 10;
  }

  if (rowCount > 0) {
    rowStart = (selectedPageSize * (selectedPage - initialPage)) + 1;
    rowEnd =
      rowStart + selectedPageSize > rowCount ? rowCount : rowStart + selectedPageSize - 1;
    pageCount = Math.ceil(rowCount / selectedPageSize);
  }

  const handlePreviousPage = () => {
    const newVal = selectedPage - 1;
    if (isValid(newVal)) {
      callCallback(newVal);
    }
  };

  const handleNextPage = () => {
    const newVal = selectedPage + 1;
    if (isValid(newVal)) {
      callCallback(newVal);
    }
  };

  const handleFirstPage = () => {
    callCallback(initialPage);
  };
  const handleLastPage = () => {
    callCallback(pageCount);
  };
  const handlePageSizeChange = (value) => {
    setPageSize(+value);

    // Changing the page size requires the page to be set back to first page
    callCallback(initialPage);
  };

  const handlePageKeyUp = (event) => {
    // When the Enter key is pressed, the same workflow as on focus lost should be started.
    if (event.keyCode === 13) {
      handlePageBlur(currentPage);
    }
  };

  const handlePageBlur = (value) => {
    if (!isValid(value)) {
      setCurrentPage(value = isValid(currentPage) ? currentPage : selectedPage);
    }

    value = parseInt(value);

    if (selectedPage !== value) {
      callCallback(value);
    }
  };

  const handlePageChange = (value) => {
    // Allow only valid values for the current page input.
    // Allow empty as well, to get ability to the user to clear the input and type another value.
    if (!isValidOrEmpty(value)) {
      return;
    }

    setCurrentPage(value);
  };

  const isValidOrEmpty = (value) => {
    return value === '' || isValid(value);
  };

  const isValid = (value) => {
    const isInteger = !value.toString().includes('.') && !isNaN(parseInt(value));
    const isInRange = (value <= pageCount) && (value >= initialPage);

    return (isInteger && isInRange);
  };

  const callCallback = (selected) => {
    setCurrentPage(selected);

    if (
      typeof onPageChange !== 'undefined' &&
      typeof onPageChange === 'function'
    ) {
      onPageChange({ selected });
    }
  };

  return (
    <div className={mergeClassName('bg-white px-3 py-2.5 flex items-center justify-between border-t border-gray-200 sm:px-6', className)}>
      <div className="flex-1 flex justify-between sm:hidden">
        <a
          href="#"
          className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          Previous
        </a>
        <a
          href="#"
          className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          Next
        </a>
      </div>
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing
            <span className="font-medium">{` ${rowStart} `}</span>
            to
            <span className="font-medium">{` ${rowEnd} `}</span>
            of
            <span className="font-medium">{` ${rowCount} `}</span>
            results
          </p>
        </div>
        <div>
          <nav
            className="items-center relative gap-2 z-0 flex rounded-md -space-x-px"
            aria-label="Pagination"
          >
            {/* Dropdown page size selection. Only show if there is a method given on what to do when page size is changed */}
            {setPageSize && (
              <div className="mb-0.5 mr-4 w-26">
                <FormElement
                  value={selectedPageSize}
                  id="pageSize"
                  name="pageSize"
                  type="select"
                  selectOptions={pageSizeOptions}
                  onChange={handlePageSizeChange}
                  disabled={isDisabled}
                />
              </div>
            )}

            <PaginatorButton
              value="First Page"
              onClick={handleFirstPage}
              icon={ChevronDoubleLeftIcon}
              isDisabled={(selectedPage === initialPage) || isDisabled}
            />

            <PaginatorButton
              value="Previous"
              onClick={handlePreviousPage}
              icon={ChevronLeftIcon}
              isDisabled={(selectedPage === initialPage) || isDisabled}
            />

            <div className="w-12">
              <FormTextInput
                textAlign="text-center"
                height={10}
                name="currentPage"
                value={currentPage}
                onKeyUp={handlePageKeyUp}
                onBlur={handlePageBlur}
                onChange={handlePageChange}
                isDisabled={isDisabled}
              />
            </div>

            <div className="text-sm sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <span>{`of ${pageCount}`}</span>
            </div>

            <PaginatorButton
              value="Next"
              onClick={handleNextPage}
              icon={ChevronRightIcon}
              isDisabled={(selectedPage === pageCount) || isDisabled}
            />

            <PaginatorButton
              value="Last Page"
              onClick={handleLastPage}
              icon={ChevronDoubleRightIcon}
              isDisabled={(selectedPage === pageCount) || isDisabled}
            />
          </nav>
        </div>
      </div>
    </div>
  );
};

Paginator.defaultProps = {
  className: '',
};

Paginator.propTypes = {
  rowCount: PropTypes.number,
  pageSize: PropTypes.number,
  selectedPage: PropTypes.number,
  initialPage: PropTypes.number,
  setPageSize: PropTypes.func,
  onPageChange: PropTypes.func,
  className: PropTypes.string,
  isDisabled: PropTypes.bool,
};

export default Paginator;
