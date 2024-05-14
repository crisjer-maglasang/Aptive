import PropTypes from 'prop-types';
import { useState } from 'react';

import { CustomButton } from '@/components';
import { ClipboardCopyIcon } from '@heroicons/react/outline';
import { CheckCircleIcon } from '@heroicons/react/solid';

const CopyToClipboardButton = ({ text }) => {
  const [copied, setCopied] = useState(false);
  const [timer, setTimer] = useState(null);

  const resetTimer = () => {
    if (timer) {
      clearTimeout(timer);
    }
    setTimer(
      setTimeout(() => {
        setCopied(false);
      }, 5_000)
    );
  };

  const handleCopyClick = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      resetTimer();
    });
  };

  return (
    <CustomButton color={copied ? 'white' : 'green'} onClick={handleCopyClick}>
      {copied ? (
        <>
          <CheckCircleIcon className="h-5 w-5" />
          <span>Copied!</span>
        </>
      ) : (
        <>
          <ClipboardCopyIcon className="h-5 w-5" />
          <span>Copy to Clipboard</span>
        </>
      )}
    </CustomButton>
  );
};

CopyToClipboardButton.propTypes = {
  text: PropTypes.string.isRequired,
};

export default CopyToClipboardButton;
