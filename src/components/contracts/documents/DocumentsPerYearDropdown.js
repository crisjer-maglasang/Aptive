import { memo } from 'react';
import PropTypes from 'prop-types';
import { Disclosure } from '@headlessui/react';
import { ChevronRightIcon } from '@heroicons/react/outline';
import { mergeClassName } from '@/lib/utils';
import DocumentItem from './DocumentItem';

const DocumentsPerYearDropdown = ({
  year,
  documents,
  isUpdating,
  isEditable,
  isSeparated,
  isSignedMark,
  documentIdUpdated,
  onViewClick,
  onHideClick,
  onRevealClick,
}) => {
  return (
    <Disclosure as="div" className="mb-2">
      {({ open }) => (
        <>
          <Disclosure.Button
            className="w-full relative flex items-center justify-between p-4 bg-white shadow sm:rounded-md sm:px-6 hover:bg-gray-50"
          >
            <span className="text-sm font-medium text-gray-900 ">
              {year}
            </span>
            <ChevronRightIcon className={mergeClassName('w-5 h-5 stroke-gray-500', { 'rotate-90 transform': open })} />
          </Disclosure.Button>
          <Disclosure.Panel as="ul" className="p-2 overflow-hidden bg-white rounded-b-lg shadow">
            {documents?.map((document) => {
              const isLoading = isUpdating && document.id === documentIdUpdated;

              return (
                <DocumentItem
                  key={document.id}
                  document={document}
                  isLoading={isLoading}
                  isEditable={isEditable}
                  isSeparated={isSeparated}
                  isSignedMark={isSignedMark}
                  isHidden={Boolean(document?.hiddenBy)}
                  onViewClick={onViewClick(document)}
                  onHideClick={onHideClick(document.id, document.year)}
                  onRevealClick={onRevealClick(document.id, document.year)}
                />
              );
            })}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

DocumentsPerYearDropdown.propTypes = {
  year: PropTypes.string,
  documents: PropTypes.array,
  isUpdating: PropTypes.bool,
  isEditable: PropTypes.bool,
  isSeparated: PropTypes.bool,
  isSignedMark: PropTypes.bool,
  documentIdUpdated: PropTypes.number,
  onViewClick: PropTypes.func,
  onHideClick: PropTypes.func,
  onRevealClick: PropTypes.func,
};

export default memo(DocumentsPerYearDropdown);
