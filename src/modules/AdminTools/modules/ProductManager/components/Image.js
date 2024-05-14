import classNames from 'classnames';
import PropTypes from 'prop-types';

const Image = ({ src, className }) => (
  <div className={classNames('m-auto overflow-hidden', className)}>
    <img src={src} className="h-full w-auto object-cover object-center" />
  </div>
);

Image.propTypes = {
  src: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  className: PropTypes.any,
};

export default Image;
