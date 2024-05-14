import { connect } from 'react-redux';
import {
  complexesWithAddressSelector,
  requestComplexesWithAddressAsync,
} from '@/modules/Housing/redux/apartment';
import {
  isArchiveComplexLoadingSelector,
  isComplexesWithAddressLoadingSelector,
} from '@/modules/Housing/redux/loading';
import { useParams } from 'react-router';
import React, { useEffect, useMemo } from 'react';
import ComplexWithAddress from './ComplexWithAddress';
import { Loader } from '@/components/common';
import { apartmentConstants } from '@/modules/Housing/lib';

const ComplexesList = ({
  complexesWithAddress,
  isComplexesLoading,
  isArchiveComplexLoading,
  getComplexesWithAddress,
}) => {
  const { teamId } = useParams();

  useEffect(() => {
    if (teamId && !isArchiveComplexLoading) {
      getComplexesWithAddress({ team_id: teamId, search_type: apartmentConstants.SEARCH_TYPE_ACTIVE_AND_ARCHIVED });
    }
  }, [teamId, isArchiveComplexLoading]);

  const totalRows = useMemo(() => {
    const rows = [];

    complexesWithAddress?.forEach((complex) => {
      rows.push(
        <ComplexWithAddress
          key={complex.id}
          complex={complex}
        />,
      );
    });

    return rows;
  }, [complexesWithAddress]);

  return (
    <div className="">
      <div className="p-6">
        <h2 className="text-xl font-normal">Complexes</h2>
        <div className="text-gray-600">Personal details, financial status, and activity.</div>
      </div>
      {isComplexesLoading || isArchiveComplexLoading ? <Loader className="pt-6" /> : totalRows}
    </div>
  );
};

const mapStateToProps = (state) => ({
  complexesWithAddress: complexesWithAddressSelector(state),
  isComplexesLoading: isComplexesWithAddressLoadingSelector(state),
  isArchiveComplexLoading: isArchiveComplexLoadingSelector(state),
});

const mapDispatchToProps = {
  getComplexesWithAddress: requestComplexesWithAddressAsync.request,
};

export default connect(mapStateToProps, mapDispatchToProps)(ComplexesList);
