import { memo } from 'react';
import PropTypes from 'prop-types';
import { mergeClassName } from '@/lib/utils';
import DocumentItem from '../DocumentItem/DocumentItem';

export const DocumentsCard = ({ title, documents, hasDivider }) => {
  return (
    <div className={mergeClassName('p-2', { 'border-b': hasDivider })}>
      <h2 className="mb-1.5 px-3 text-sm text-gray-900 font-medium">{title}</h2>
      <ul>
        {documents.map((item) => <DocumentItem key={item.id} {...item} />)}
      </ul>
    </div>
  );
};

DocumentsCard.propTypes = {
  title: PropTypes.string,
  documents: PropTypes.array,
  hasDivider: PropTypes.bool,
};

export default memo(DocumentsCard);
