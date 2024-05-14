import { connect } from 'react-redux';
import { useParams } from 'react-router';
import React, { useCallback, useEffect, useState } from 'react';
import { complexHistorySelector, requestComplexHistoryAsync } from '@/modules/Housing/redux/apartment';
import { Table } from '@/components/common';
import { getComplexHistoryRows, getComplexHistoryHeadRows } from '@/modules/Housing/modules/ApartmentSetup/lib';
import { isComplexHistoryLoadingSelector } from '@/modules/Housing/redux/loading';

const initialPage = 1;
const initialPageSize = 10;

const History = ({
  isLoading,
  complexHistory,
  getComplexHistory,
}) => {
  const [selectedPage, setSelectedPage] = useState(initialPage);
  const [pageSize, setPageSize] = useState(initialPageSize);

  const { complexId } = useParams();

  useEffect(() => {
    getComplexHistory({
      page: {
        number: selectedPage,
        size: pageSize,
      },
      complexId: complexId,
    });
  }, [complexId, selectedPage, pageSize]);

  const onPageChange = useCallback(({ selected }) => {
    setSelectedPage(selected);
  }, []);

  const apartmentHistoryRows = getComplexHistoryRows(complexHistory?.items);

  return (
    <>
      <div className="p-6">
        <h2 className="text-xl font-normal">Complex history</h2>
        <div className="text-gray-600">Personal details, financial status, and activity history.</div>
      </div>
      <div className="w-full sm:w-full overflow-hidden sm:overflow-y-auto">
        <Table
          loading={isLoading}
          thead={{rows: getComplexHistoryHeadRows()}}
          tbody={{
            rows: apartmentHistoryRows,
          }}
          paginator={{
            pageSize,
            setPageSize,
            onPageChange,
            selectedPage,
            initialPage,
            rowCount: complexHistory?.total,
          }}
          wrapper={{
            className: 'rounded-none border-x-0',
          }}
        />
      </div>
    </>
  )
}

const mapStateToProps = (state) => ({
  isLoading: isComplexHistoryLoadingSelector(state),
  complexHistory: complexHistorySelector(state),
});

const mapDispatchToProps = {
  getComplexHistory: requestComplexHistoryAsync.request,
};

export default connect(mapStateToProps, mapDispatchToProps)(History);
