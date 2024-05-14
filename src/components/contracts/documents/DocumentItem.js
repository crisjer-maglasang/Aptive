import { memo } from 'react';
import PropTypes from 'prop-types';
import { DocumentTextIcon, EyeIcon, EyeOffIcon } from '@heroicons/react/outline';
import { IconButton, OpenExternalIcon } from '@/components/common';
import { formatDateDisplay, mergeClassName } from '@/lib/utils';

const DocumentItem = ({
  document,
  isEditable,
  isSeparated,
  isHidden,
  isLoading,
  isSignedMark,
  onViewClick,
  onHideClick,
  onRevealClick,
}) => {
  return (
    <li className={mergeClassName(
      'bg-white p-4 flex items-center justify-between gap-x-2',
      isSeparated ? 'border rounded-xl mb-2 last:mb-0' : 'border-b last:border-none',
    )}
    >
      <div className="grow flex items-center justify-start gap-x-2">
        <DocumentTextIcon className={mergeClassName('block basis-1/12 h-7 w-7 text-aptivegreen', { 'text-gray-400': isLoading })} />
        <div className="basis-11/12">
          <p className={mergeClassName('text-sm font-medium whitespace-normal', { 'text-gray-400': isLoading })}>
            {document?.title}
          </p>
          {Boolean(isSignedMark) && (
            <span className="text-xs italic text-gray-400">
              {document.dateSigned && !document.isPending ?
                `Signed: ${formatDateDisplay(document.dateSigned)}` :
                'Not Signed'}
            </span>
          )}
        </div>
      </div>
      <div className="basis-1/5 flex items-center justify-end gap-x-2">
        {Boolean(isEditable) && (
          <IconButton
            onClick={isHidden ? onRevealClick : onHideClick}
            disabled={isLoading}
            actionTitle={isHidden ? 'Reveal contract' : 'Hide contract'}
            className={mergeClassName('text-gray-400', { 'hover:text-gray-500': !isLoading })}
          >
            {isHidden
              ? <EyeOffIcon className="h-6 w-6" />
              : <EyeIcon className="h-6 w-6" />}
          </IconButton>
        )}
        <IconButton
          onClick={onViewClick}
          actionTitle="Open document"
          disabled={isLoading}
          className="text-gray-400 hover:text-gray-500"
        >
          <OpenExternalIcon />
        </IconButton>
      </div>
    </li>
  );
};

DocumentItem.propTypes = {
  document: PropTypes.object,
  isEditable: PropTypes.bool,
  isSeparated: PropTypes.bool,
  isHidden: PropTypes.bool,
  isLoading: PropTypes.bool,
  isSignedMark: PropTypes.bool,
  onViewClick: PropTypes.func,
  onHideClick: PropTypes.func,
  onRevealClick: PropTypes.func,
};

export default memo(DocumentItem);
