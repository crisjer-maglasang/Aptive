import PropTypes from 'prop-types';
import { memo } from 'react';
import ReactTooltip from 'react-tooltip';

const TooltipText = ({
  id,
  text,
  message,
}) => (
  <div data-for={id} data-tip={message} className="inline">
    {text}
    <ReactTooltip
      className="normal-case"
      id={id}
      place="top"
      effect="solid"
    />
  </div>
);

TooltipText.propTypes = {
  id: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
}

export default memo(TooltipText);
