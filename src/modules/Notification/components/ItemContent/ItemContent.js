import { memo } from 'react';
import PropTypes from 'prop-types';
import { TOKENS } from '../../lib';
import { Avatar } from '@/components/common';
import { DOCUMENTS, REJECT_REASONS_TEXT } from '@/lib/constants';
import { mergeClassName } from '@/lib/utils';

const { STRONG, REJECT_REASON, GALLERY, PLAIN, APPROVAL_DOCUMENT } = TOKENS;

const ItemContent = ({ type, data }) => {
  const renderPlainText = (text) => (
    <span>
      {text}
      &nbsp;
    </span>
  );

  const renderStrongText = (text) => (
    <strong className="text-black">
      {text}
      &nbsp;
    </strong>
  );

  const renderTextBold = (text, isSpace = true) => (
    <span className="font-semibold">
      {text}
      {isSpace ? <>&nbsp;</> : null}
    </span>
  );

  const renderGallery = () => {
    const remainItems = Number(data?.total) - data?.items?.length;

    return (
      <div className="flex flex-nowrap justify-between gap-x-2 p-2 bg-zinc-50 rounded border min-w-72 mb-2">
        <div className="flex flex-nowrap justify-between gap-x-2">
          {data?.items?.map((item, i) => (
            <Avatar
              key={`user-${i}`}
              image={item.url}
              className="rounded-sm"
              square
            />
          ))}
        </div>
        {Number(data?.total) > data?.items?.length && (
          <div className="w-8 h-8 rounded-sm flex items-center justify-center bg-gray-200">
            <span
              className={mergeClassName(
                'text-sm text-gray-900 ',
                { 'text-xs': remainItems > 99, 'text-[10px]': remainItems > 999 },
              )}
            >
              {`+${remainItems}`}
            </span>
          </div>
        )}
      </div>
    );
  };
  const renderContent = () => {
    const items = {
      [PLAIN]: renderPlainText(data),
      [STRONG]: renderStrongText(data?.content),
      [REJECT_REASON]: renderTextBold(REJECT_REASONS_TEXT[data?.content], false),
      [APPROVAL_DOCUMENT]: renderTextBold(DOCUMENTS[data?.content]),
      [GALLERY]: renderGallery(),
    };

    return items[type];
  };

  return renderContent();
};

ItemContent.propTypes = {
  type: PropTypes.string,
  data: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

export default memo(ItemContent);
