import { ComplexesTable, ComplexModal } from '../components/Complex';
import { CustomButton } from '@/components/common';
import { useCallback, useEffect, useState } from 'react';
import {
  requestTeamsStatisticsAsync,
  teamsStatisticsSelector,
  teamsStatisticsTotalSelector,
  requestComplexesStatisticsAsync,
  complexesStatisticsSelector,
  complexesStatisticsTotalSelector,
  resetSelectedComplexAction,
} from '@/modules/Housing/redux/apartment';
import {
  isApartmentViewLoadingSelector,
  isArchiveComplexLoadingSelector,
} from '@/modules/Housing/redux/loading';
import { DropdownButton } from '@/modules/Housing/components/common';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router';

const initialPageSize = 10;
const initialPage = 1;
const initialSearchText = '';

const viewOptions = [
  { label: 'View by team', value: 'team' },
  { label: 'View by complex', value: 'complex' },
];

const ApartmentSetup = ({
  getTeamsStatistics,
  teamsStatistics,
  teamsStatisticsTotal,
  getComplexesStatistics,
  complexesStatistics,
  complexesStatisticsTotal,
  isApartmentViewLoading,
  isArchiveComplexLoading,
  resetSelectedComplex,
}) => {
  const location = useLocation();
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [selectedPage, setSelectedPage] = useState(initialPage);
  const [selectedComplexId, setSelectedComplexId] = useState();
  const [isComplexOpen, setIsComplexOpen] = useState(false);
  const [viewOption, setViewOption] = useState(location.state?.viewOption || 'team');
  const [searchValue, setSearchValue] = useState(initialSearchText);

  useEffect(() => {
    if (!isArchiveComplexLoading) {
      getStatisticsData();
    }
  }, [getTeamsStatistics, getComplexesStatistics, pageSize, selectedPage, isArchiveComplexLoading]);

  useEffect(() => {
    if (selectedPage !== initialPage) {
      setSelectedPage(initialPage);
    } else if (!isArchiveComplexLoading) {
      getStatisticsData();
    }
  }, [viewOption, searchValue, isArchiveComplexLoading]);

  const getStatisticsData = () => {
    const params = {
      page: {
        size: pageSize,
        number: selectedPage,
      },
      ...(searchValue && { search_query: searchValue }),
    };

    if (viewOption === 'team') {
      getTeamsStatistics(params);
    } else {
      getComplexesStatistics(params);
    }
  };

  const handleViewOptionChange = useCallback(({ value }) => {
    setViewOption(value);
  }, []);

  const onPageChange = useCallback(({ selected }) => {
    setSelectedPage(selected);
  }, []);

  const onComplexModalClose = useCallback(() => {
    resetSelectedComplex();
    setSelectedComplexId(null);
    setIsComplexOpen(false);
    getStatisticsData();
  }, [
    resetSelectedComplex,
    setSelectedComplexId,
    setIsComplexOpen,
    getStatisticsData,
  ]);

  const onEditClick = useCallback((event, id) => {
    if (viewOption === 'complex') {
      setSelectedComplexId(id);
      setIsComplexOpen(true);
    }

    event.stopPropagation();
  }, [viewOption]);

  return (
    <div className="grow p-6">
      <div className="mb-4 flex justify-between items-center">
        <span className="text-gray-900 text-[32px] font-normal leading-10">
          Apartments view
        </span>
        <div className="justify-end items-center gap-4 inline-flex">
          <DropdownButton
            color="white"
            options={viewOptions}
            buttonClassName="px-2 py-1 rounded-2xl border border-gray-200 justify-start items-center gap-1 flex"
            label={viewOption === 'team' ? 'View by team' : 'View by complex'}
            labelClassName="text-right text-xs font-normal font-['Inter'] leading-none"
            iconClassName="w-3 h-3 relative"
            onChange={handleViewOptionChange}
          />
          <CustomButton
            color="white"
            onClick={() => setIsComplexOpen(true)}
            className="px-2 py-1 rounded-2xl border border-gray-200 justify-start flex gap-1 items-center focus:ring-0"
          >
            <div className="text-right text-gray-900 text-xs font-normal font-['Inter'] leading-none">
              Add complex
            </div>
          </CustomButton>
          <DropdownButton
            color="white"
            options={[]}
            buttonClassName="px-2 py-1 rounded-2xl border border-gray-200 justify-start items-center gap-1 flex"
            label="Data"
            labelClassName="text-right text-xs font-normal font-['Inter'] leading-none"
            iconClassName="w-3 h-3 relative"
            onChange={() => {}}
          />
        </div>
      </div>
      <ComplexesTable
        pageSize={pageSize}
        selectedPage={selectedPage}
        initialPage={initialPage}
        setPageSize={setPageSize}
        onPageChange={onPageChange}
        teamsStatistics={teamsStatistics}
        teamsStatisticsTotal={teamsStatisticsTotal}
        complexesStatistics={complexesStatistics}
        complexesStatisticsTotal={complexesStatisticsTotal}
        viewOption={viewOption}
        isLoading={isApartmentViewLoading || isArchiveComplexLoading}
        onEditClick={onEditClick}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />
      <ComplexModal isOpen={isComplexOpen} complexId={selectedComplexId} onClose={onComplexModalClose} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    teamsStatistics: teamsStatisticsSelector(state),
    teamsStatisticsTotal: teamsStatisticsTotalSelector(state),
    complexesStatistics: complexesStatisticsSelector(state),
    complexesStatisticsTotal: complexesStatisticsTotalSelector(state),
    isApartmentViewLoading: isApartmentViewLoadingSelector(state),
    isArchiveComplexLoading: isArchiveComplexLoadingSelector(state),
  };
};

const mapDispatchToProps = {
  getTeamsStatistics: requestTeamsStatisticsAsync.request,
  getComplexesStatistics: requestComplexesStatisticsAsync.request,
  resetSelectedComplex: resetSelectedComplexAction,
};

ApartmentSetup.propTypes = {
  getTeamsStatistics: PropTypes.func.isRequired,
  teamsStatistics: PropTypes.array,
  teamsStatisticsTotal: PropTypes.number,
  getComplexesStatistics: PropTypes.func.isRequired,
  complexesStatistics: PropTypes.array,
  complexesStatisticsTotal: PropTypes.number,
  isApartmentViewLoading: PropTypes.bool,
  resetSelectedComplex: PropTypes.func,
  isArchiveComplexLoading: PropTypes.bool,
};

export default connect(mapStateToProps, mapDispatchToProps)(ApartmentSetup);
