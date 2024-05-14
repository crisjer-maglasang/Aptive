import { Table } from '@/components';
import { allStatesSelector, selectCountries } from '@/redux/addresses';
import { repEditHistoryLoadingSelector } from '@/redux/loading';
import { requestRepEditHistoryAsync, repEditHistorySelector } from '@/redux/onboarding';
import { apartmentStatusesSelector, experienceOptionsSelector, repStatusesSelector } from '@/redux/reps';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { connect } from 'react-redux';
import { getTHeadRows, getTBodyRows } from '../lib';
import { ProfileWizardContext } from '..';
import PropTypes from 'prop-types';

const Content = ({
  // State
  history,
  loading,
  states,
  experiences,
  apartmentStatuses,
  countries,
  repStatuses,

  // Dispatch
  getHistory,
}) => {
  const initialPageNumber = 1;
  const initialPageSize = 10;

  const { userId, section, recruitingSeasonId } = useContext(ProfileWizardContext);

  const theadRows = useMemo(() => getTHeadRows(), []);

  const tbodyRows = useMemo(() => getTBodyRows(history.items, {
    states,
    experiences,
    apartmentStatuses,
    countries,
    repStatuses,
  }), [
    history.items,
    states,
    experiences,
    apartmentStatuses,
    countries,
  ]);

  const [pageNumber, setPageNumber] = useState(initialPageNumber);
  const [pageSize, setPageSize] = useState(initialPageSize);

  const onPageChange = useCallback(({ selected }) => {
    setPageNumber(selected);
  }, []);

  useEffect(() => {
    getHistory({
      userId,
      section,
      pageNumber,
      pageSize,
      recruitingSeasonId,
    });
  }, [
    getHistory,
    userId,
    section,
    pageNumber,
    pageSize,
    recruitingSeasonId,
  ]);

  return (
    <div className="flex flex-col flex-grow bg-gray-50 overflow-hidden">
      <Table
        loading={loading}
        loader={{
          className: 'my-auto',
        }}
        wrapper={{
          className: 'relative flex flex-col flex-grow border-0 rounded-none overflow-y-auto',
        }}
        thead={{
          className: 'sticky top-0 after:absolute after:inset-x-0 after:bottom-0 after:w-full after:border-b',
          rows: theadRows,
        }}
        tbody={{
          rows: tbodyRows,
        }}
        paginator={{
          className: 'sticky bottom-0',
          rowCount: history.total,
          initialPage: initialPageNumber,
          selectedPage: pageNumber,
          onPageChange: onPageChange,
          pageSize: pageSize,
          setPageSize: setPageSize,
        }}
        className="border-b mb-auto"
      />
    </div>
  );
};

Content.propTypes = {
  apartmentStatuses: PropTypes.arrayOf(PropTypes.object),
};

const mapStateToProps = (state) => ({
  history: repEditHistorySelector(state),
  loading: repEditHistoryLoadingSelector(state),
  states: allStatesSelector(state),
  experiences: experienceOptionsSelector(state),
  apartmentStatuses: apartmentStatusesSelector(state),
  countries: selectCountries(state),
  repStatuses: repStatusesSelector(state),
});

const mapDispatchToProps = {
  getHistory: requestRepEditHistoryAsync.request,
};

export default connect(mapStateToProps, mapDispatchToProps)(Content);
