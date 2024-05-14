import { CustomButton, Icon } from '@/components';
import { DRAW_MODE } from '../../lib';
import PropTypes from 'prop-types';

const LassoControl = ({ drawMode, changeDrawMode }) => {
  return (
    <CustomButton
      onClick={changeDrawMode}
      color={drawMode === DRAW_MODE.CREATE ? 'green' : 'white'}
      className="py-3 border-2 border-black/25 rounded focus:ring-0 focus:ring-offset-0"
    >
      <Icon icon="lasso" />
    </CustomButton>
  );
};

LassoControl.propTypes = {
  drawMode: PropTypes.number,
  changeDrawMode: PropTypes.func,
};

export default LassoControl;
