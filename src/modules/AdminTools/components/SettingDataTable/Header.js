import PropTypes from 'prop-types';

import { default as BaseHeader } from '@/modules/AdminTools/components/Header';
import Create from './Create';

const Header = ({ title, ...props }) => (
  <>
    <BaseHeader {...{ title }} />

    <Create {...props} />
  </>
);

Header.propTypes = {
  title: PropTypes.any,
};

export default Header;
