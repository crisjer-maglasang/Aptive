import { mergeClassName } from '@/lib'
import PropTypes from 'prop-types'
import { PulseLoader } from 'react-spinners'

const Loader = ({ color, size, className }) => (
  <div className={mergeClassName('flex justify-center', className)}>
    <PulseLoader color={color} loading={true} size={size} />
  </div>
)

Loader.defaultProps = {
  color: '#77856e',
  size: 10
}
  
Loader.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.object
  ])
}
export default Loader
