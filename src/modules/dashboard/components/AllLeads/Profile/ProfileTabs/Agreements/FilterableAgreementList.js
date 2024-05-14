import { useCallback, useState } from 'react';
import AgreementSearchAdd from './AgreementSearchAdd';
import { dashboardConstants } from '@/lib';
import { connect } from 'react-redux';
import { recruitingSeasonSelector } from '@/redux/reps';
import { hideContractAsync, revealContractAsync } from '@/redux/contracts';
import { updateContractLoadingSelector } from '@/redux/loading';
import { DocumentItem, DocumentsPerYearDropdown } from '@/components';
import PropTypes from 'prop-types';
import { isContractEditableSelector } from '@/redux/auth';

const { PENDING_TITLE } = dashboardConstants;

const FilterableAgreementList = ({
  isContractEditable,
  agreementsPerYears,
  onAddNewClick,
  onContractClick,
  recruitingSeason,
  hideContract,
  revealContract,
  selectedUser,
  isUpdating,
}) => {
  const [searchText, setSearchText] = useState('');
  const [documentIdUpdated, setDocumentIdUpdated] = useState(null);

  const handleViewClick = useCallback((agreement) => () => {
    onContractClick(agreement);
  }, [onContractClick]);

  const handleSearchTextChange = useCallback((value) => {
    setSearchText(value);
  }, []);

  const getPendingAgreements = () => {
    const currentYear = new Date(recruitingSeason?.end_date).getFullYear().toString();
    const currentYearAgreements = agreementsPerYears?.[currentYear] ?? [];

    return currentYearAgreements
      .filter((agreement) =>
        agreement?.title.toLowerCase().includes(searchText.toLowerCase()) && agreement?.isPending);
  };

  const getFilteredAgreements = () => {
    const filteredAgreements = {};
    const currentYear = new Date(recruitingSeason?.end_date).getFullYear().toString();

    Object.entries(agreementsPerYears).forEach(([year, agreements]) => {
      const yearAgreements = agreements.filter((agreement) =>
        agreement?.title.toLowerCase().includes(searchText.toLowerCase())
          && (year !== currentYear || !agreement?.isPending));

      if (yearAgreements.length) {
        filteredAgreements[year] = yearAgreements;
      }
    });

    return filteredAgreements;
  };

  const handleHideContract = useCallback((contractId, contractYear) => () => {
    setDocumentIdUpdated(contractId);
    hideContract({ contractId, contractYear, selectedUser });
  }, [hideContract, selectedUser]);

  const handleRevealContract = useCallback((contractId, contractYear) => () => {
    setDocumentIdUpdated(contractId);
    revealContract({ contractId, contractYear, selectedUser });
  }, [revealContract, selectedUser]);

  return (
    <div className="px-6 py-5 border-b border-gray-200 bg-gray-100 h-screen">
      <div className="mb-4">
        <AgreementSearchAdd
          searchText={searchText}
          onSearchTextChanged={handleSearchTextChange}
          onAddNewClick={onAddNewClick}
        />
      </div>

      {getPendingAgreements().length > 0 && (
        <div className="mb-4">
          <h2 className="font-bold text-lg">{PENDING_TITLE}</h2>
          <ul className="bg-white shadow overflow-hidden sm:rounded-md mt-4">
            {getPendingAgreements().map((agreement) => (
              <DocumentItem
                isSignedMark
                key={agreement.id}
                document={agreement}
                onViewClick={handleViewClick(agreement)}
              />
            ))}
          </ul>
        </div>
      )}
      {Object.keys(agreementsPerYears)?.reverse()?.map((year) => {
        const documents = getFilteredAgreements()[year];

        return documents && documents.length > 0
          ? (
            <DocumentsPerYearDropdown
              key={year}
              year={year}
              isSignedMark
              documents={documents}
              isEditable={isContractEditable}
              documentIdUpdated={documentIdUpdated}
              isUpdating={isUpdating}
              onViewClick={handleViewClick}
              onHideClick={handleHideContract}
              onRevealClick={handleRevealContract}
            />
          )
          : '';
      })}
    </div>
  );
};

const mapStateToProps = (state) => ({
  isContractEditable: isContractEditableSelector(state),
  isUpdating: updateContractLoadingSelector(state),
  recruitingSeason: recruitingSeasonSelector(state),
});

const mapDispatchToProps = ({
  hideContract: hideContractAsync.request,
  revealContract: revealContractAsync.request,
});

FilterableAgreementList.propTypes = {
  isContractEditable: PropTypes.bool,
  agreementsPerYears: PropTypes.object,
  onAddNewClick: PropTypes.func,
  onContractClick: PropTypes.func,
  recruitingSeason: PropTypes.object,
  hideContract: PropTypes.func,
  revealContract: PropTypes.func,
  selectedUser: PropTypes.number,
  isUpdating: PropTypes.bool,
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterableAgreementList);
