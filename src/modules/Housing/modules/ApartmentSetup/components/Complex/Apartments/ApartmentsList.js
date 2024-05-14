import { connect } from 'react-redux';
import {
  apartmentsWithBedsSelector,
  requestApartmentsWithBedsAsync,
  resetSelectedApartmentAction,
  selectedComplexSelector,
} from '@/modules/Housing/redux/apartment';
import {
  isApartmentsWithBedsLoadingSelector,
  isArchiveApartmentLoadingSelector,
} from '@/modules/Housing/redux/loading';
import { useParams } from 'react-router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import ApartmentWithBeds from './ApartmentWithBeds';
import { Loader } from '@/components/common';
import { ApartmentModal } from '../../Apartment';

const ApartmentsList = ({
  selectedComplex,
  apartmentsWithBeds,
  isApartmentsLoading,
  isArchiveApartmentLoading,
  getApartmentsWithBeds,
  resetSelected,
}) => {
  const [selectedApartmentId, setSelectedApartmentId] = useState();
  const [apartmentOpen, setApartmentOpen] = useState(false);
  const { complexId } = useParams();

  const onApartmentClose = useCallback(() => {
    setApartmentOpen(false);
    resetSelected();

    if (!isArchiveApartmentLoading) {
      getApartmentsWithBeds({ complexId });
    }
  }, [resetSelected, complexId, getApartmentsWithBeds, isArchiveApartmentLoading]);

  const onApartmentClick = useCallback((apartmentId) => {
    setApartmentOpen(true);
    setSelectedApartmentId(apartmentId);
  }, []);

  useEffect(() => {
    if (!isArchiveApartmentLoading) {
      getApartmentsWithBeds({ complexId });
    }
  }, [complexId, getApartmentsWithBeds, isArchiveApartmentLoading]);

  const totalRows = useMemo(() => {
    const rows = [];

    apartmentsWithBeds?.forEach((apartment) => {
      rows.push(
        <ApartmentWithBeds
          key={apartment.id}
          apartment={apartment}
          onClick={() => onApartmentClick(apartment.id)}
        />,
      );
    });

    return rows;
  }, [apartmentsWithBeds, onApartmentClick]);

  return (
    <>
      <div className="p-6">
        <h2 className="text-xl font-normal">Apartments</h2>
        <div className="text-gray-600">Personal details, financial status, and activity.</div>
      </div>
      <>{isApartmentsLoading || isArchiveApartmentLoading ? <Loader className="pt-6" /> : totalRows}</>
      <ApartmentModal
        isOpen={apartmentOpen}
        complex={selectedComplex}
        onClose={onApartmentClose}
        apartmentId={selectedApartmentId}
      />
    </>
  );
};

const mapStateToProps = (state) => ({
  apartmentsWithBeds: apartmentsWithBedsSelector(state),
  isApartmentsLoading: isApartmentsWithBedsLoadingSelector(state),
  selectedComplex: selectedComplexSelector(state),
  isArchiveApartmentLoading: isArchiveApartmentLoadingSelector(state),
});

const mapDispatchToProps = {
  getApartmentsWithBeds: requestApartmentsWithBedsAsync.request,
  resetSelected: resetSelectedApartmentAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(ApartmentsList);
