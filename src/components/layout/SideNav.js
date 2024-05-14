import classNames from 'classnames'
import { Link } from 'react-router-dom'

const SideNav = ({ items }) => (
  <div className="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto bg-white border-r">
    <div className="flex flex-col flex-grow">
      <nav className="flex-1 bg-white" aria-label="Sidebar">
        {items.map(({ name, path, active }) => {
          return (
            <Link
              key={name}
              to={path}
              className={classNames(
                active
                  ? 'text-primary-300 font-medium'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                'group flex items-center pl-8 pr-2 py-2 text-sm'
              )}
            >
              {name}
            </Link>
          )
        })}
      </nav>
    </div>
  </div>
)

export default SideNav
