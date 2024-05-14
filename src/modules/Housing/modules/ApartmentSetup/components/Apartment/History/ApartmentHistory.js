import { useState, useEffect, useCallback, useRef } from 'react';
import { Select, Table } from '@/components';
import PropTypes from 'prop-types';
import { apartmentHistorySelector, requestApartmentHistoryAsync } from '@/modules/Housing/redux/apartment';
import { isApartmentHistoryLoadingSelector } from '@/modules/Housing/redux/loading';
import { connect } from 'react-redux';
import {
  getApartmentHistoryHeadRows,
  getApartmentHistoryRows,
  getHistorySections,
} from '@/modules/Housing/modules/ApartmentSetup/lib';

const ApartmentHistory = ({
  nextStep,
  complexId,
  apartmentId,
  getApartmentHistory,
  apartmentHistory,
  isLoading,
}) => {
  const initialPage = 1;
  const initialPageSize = 10;
  const historySections = getHistorySections();

  const [selectedPage, setSelectedPage] = useState(initialPage);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [selectedSection, setSelectedSection] = useState(historySections[0].value);

  const prevSelectedSection = useRef(historySections[0].value);

  useEffect(() => {
    if (nextStep) {
      nextStep.applyTransition();
    }
  }, [nextStep]);

  useEffect(() => {
    setSelectedPage(initialPage);
  }, [selectedSection, setSelectedPage]);

  useEffect(() => {
    if (selectedSection !== prevSelectedSection.current && selectedPage !== initialPage) {
      return;
    }

    if (complexId && apartmentId) {
      getApartmentHistory({
        complexId,
        apartmentId,
        section: selectedSection,
        page: {
          number: selectedPage,
          size: pageSize,
        },
      });
    }

    prevSelectedSection.current = selectedSection;
  }, [apartmentId, selectedSection, complexId, selectedPage, pageSize, getApartmentHistory]);

  const onPageChange = useCallback(({ selected }) => {
    setSelectedPage(selected);
  }, []);

  const apartmentHistoryRows = getApartmentHistoryRows(apartmentHistory.items);

  return (
    <div className="h-full w-full overflow-y-auto">
      <Select
        name="section"
        className="float-right pb-2"
        value={selectedSection}
        options={historySections}
        defaultOption={historySections[0]}
        onChange={(event) => setSelectedSection(event.target.value)}
      />
      <div className="w-full sm:w-full overflow-hidden sm:overflow-y-auto">
        <Table
          loading={isLoading}
          thead={{ rows: getApartmentHistoryHeadRows() }}
          tbody={{
            rows: apartmentHistoryRows,
          }}
          paginator={{
            pageSize,
            setPageSize,
            onPageChange,
            selectedPage,
            initialPage,
            rowCount: apartmentHistory.total,
          }}
          wrapper={{
            className: 'rounded-none',
          }}
        />
      </div>
    </div>
  );
};

ApartmentHistory.propTypes = {
  getApartmentHistory: PropTypes.func,
  apartmentHistory: PropTypes.object,
  complexId: PropTypes.number,
  apartmentId: PropTypes.number,
  isLoading: PropTypes.bool,
  nextStep: PropTypes.shape({
    applyTransition: PropTypes.func.isRequired,
    declineTransition: PropTypes.func.isRequired,
  }),
};

const mapStateToProps = (state) => ({
  apartmentHistory: apartmentHistorySelector(state),
  isLoading: isApartmentHistoryLoadingSelector(state),
});

const mapDispatchToProps = {
  getApartmentHistory: requestApartmentHistoryAsync.request,
};

export default connect(mapStateToProps, mapDispatchToProps)(ApartmentHistory);
