import PropTypes from 'prop-types';
import { Outlet } from 'react-router';

import Header from './Header';

const Tabs = ({ links, headerChild }) => {
  return (
    <div style={{ height: 'calc(100vh - 180px)' }}>
      <div className="flex flex-col h-full">
        <Header {...{ links, headerChild }} />
        <div
          style={{ padding: '24px 32px 128px' }}
          className="flex-grow overflow-y-scroll pr-12"
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

Tabs.propTypes = {
  headerChild: PropTypes.any,
  links: PropTypes.any.isRequired,
};

export default Tabs;
