import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link, useLocation } from 'react-router-dom';

const Header = ({ links, headerChild }) => {
  const location = useLocation();
  const getEndPath = (path) => {
    const pathParts = path.split('/').filter(Boolean);

    return pathParts[pathParts.length - 1];
  };

  const endPath = getEndPath(location.pathname);

  const getActive = (path) => {
    return endPath === getEndPath(path);
  };

  const padding = { padding: '1px 8px 11px' };

  const headerLinks = links.map((link) => {
    const isActive = getActive(link.to);

    return {
      ...link,
      className: classNames([
        {
          'border-gray-800': isActive,
          'border-b-2': isActive,
          'text-gray-500': !isActive,
          'hover:border-gray-300': !isActive,
          'hover:border-b-2': !isActive,
        },
      ]),
    };
  });

  return (
    <div className="pl-8 flex flex-row bg-white border-b h-20">
      <div className="flex flex-col">
        <div className="flex-grow" />
        <div className="flex flex-row">
          {headerLinks.map(({ to, className, text }) => (
            <Link key={text} {...{ to, className }} style={padding}>
              {text}
            </Link>
          ))}
        </div>
      </div>
      {headerChild && (
        <>
          <div className="flex-grow" />
          <div className="p-6">{headerChild}</div>
        </>
      )}
    </div>
  );
};

Header.propTypes = {
  headerChild: PropTypes.any,
  links: PropTypes.array.isRequired,
};

export default Header;
