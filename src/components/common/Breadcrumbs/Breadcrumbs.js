import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Fragment, memo } from 'react';

const Breadcrumbs = memo(({ breadcrumbLinks, separator, activeLinkIndex }) => {
  return (
    <nav>
      <ul className="flex items-center">
        {breadcrumbLinks.map((item, index) => {
          const isActive = index === activeLinkIndex;
          const isSeparated = index + 1 !== breadcrumbLinks.length;
          const onAction = item.action ?? (() => {});

          return (
            <Fragment key={item.linkName}>
              <li className="mr-3">
                {isActive
                  ? <p className="text-gray-900">{item.linkName}</p>
                  : (
                    <Link
                      to={item.to}
                      onClick={onAction}
                      className="text-gray-600"
                    >
                      {item.linkName}
                    </Link>
                  )}
              </li>
              {isSeparated && <li className="mr-3 text-primary-200">{separator ?? '/'}</li>}
            </Fragment>
          );
        })}
      </ul>
    </nav>
  );
});

Breadcrumbs.propTypes = {
  breadcrumbLinks: PropTypes.arrayOf(PropTypes.shape({
    linkName: PropTypes.string,
    to: PropTypes.string,
    action: PropTypes.func,
  })).isRequired,
  activeLinkIndex: PropTypes.number.isRequired,
  separator: PropTypes.node,
};

export default Breadcrumbs;
