import { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ErrorBox, Loader } from '@/components/common';
import { hideContractAsync, requestContractLinkAsync, revealContractAsync } from '@/redux/contracts';
import { contractLinkLoadingSelector, updateContractLoadingSelector } from '@/redux/loading';
import { contractsLinkErrorSelector } from '@/redux/errors';
import { DocumentsPerYearDropdown } from '@/components';
import { onboardingConstants } from '@/lib/constants';

const DocumentsList = ({
  documents,
  recruitId,
  error,
  isEditable,
  isLoading,
  isUpdating,
  isSeparated,
  hideDocument,
  revealDocument,
  selectedUser,
  requestDocumentLink,
}) => {
  const [documentIdUpdated, setDocumentIdUpdated] = useState(null);

  const handleHideDocument = useCallback((contractId, contractYear) => () => {
    setDocumentIdUpdated(contractId);
    hideDocument({ contractId, contractYear, selectedUser });
  }, [hideDocument, selectedUser]);

  const handleRevealDocument = useCallback((contractId, contractYear) => () => {
    setDocumentIdUpdated(contractId);
    revealDocument({ contractId, contractYear, selectedUser });
  }, [revealDocument, selectedUser]);

  const onLinkLoaded = ({ link }) => {
    window.open(link, '_blank')?.focus();
  };

  const handleViewClick = useCallback((contract) => () => {
    if (contract && recruitId) {
      requestDocumentLink({
        action: 'view',
        contractId: contract.id,
        recruitId,
        callback: onLinkLoaded,
      });
    }
  }, [
    requestDocumentLink,
    onLinkLoaded,
    recruitId,
  ]);

  return isLoading
    ? <Loader />
    : (
      <>
        {error && (
          <div className="mb-2">
            <ErrorBox errors={error} />
          </div>
        )}
        {Object.keys(documents)?.length
          ? Object.keys(documents).reverse().map((year) => (
            <DocumentsPerYearDropdown
              key={year}
              year={year}
              isSeparated={isSeparated}
              isEditable={isEditable}
              documents={documents[year]}
              documentIdUpdated={documentIdUpdated}
              isUpdating={isUpdating}
              onViewClick={handleViewClick}
              onHideClick={handleHideDocument}
              onRevealClick={handleRevealDocument}
            />
          ))
          : (
            <div className="text-center">
              {onboardingConstants.NO_CONTRACTS_FOUND}
            </div>
          )}
      </>
    );
};

const mapStateToProps = (state) => ({
  isLoading: contractLinkLoadingSelector(state),
  isUpdating: updateContractLoadingSelector(state),
  error: contractsLinkErrorSelector(state),
});

const mapDispatchToProps = {
  requestDocumentLink: requestContractLinkAsync.request,
  hideDocument: hideContractAsync.request,
  revealDocument: revealContractAsync.request,
};

DocumentsList.propTypes = {
  documents: PropTypes.object,
  recruitId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  error: PropTypes.array,
  isLoading: PropTypes.bool,
  isEditable: PropTypes.bool,
  isUpdating: PropTypes.bool,
  isSeparated: PropTypes.bool,
  hideDocument: PropTypes.func,
  revealDocument: PropTypes.func,
  selectedUser: PropTypes.number,
  requestDocumentLink: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(DocumentsList);
