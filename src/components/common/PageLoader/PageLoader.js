import Loader from '../Loader';
import { mergeClassName } from '@/lib/utils';
import PropTypes from 'prop-types';

const PageLoader = ({ className }) => {
  return (
    <div className={mergeClassName('absolute inset-0 bg-white overflow-hidden bg-opacity-80 w-full h-full flex items-center justify-center z-10', className)}>
      <Loader />
    </div>
  );
};

PageLoader.propTypes = {
  className: PropTypes.string,
};

export default PageLoader;
