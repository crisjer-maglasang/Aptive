import PropTypes from 'prop-types';
import { Fragment } from 'react';

const SubFields = ({ subFields, ...props }) => (
  <div className="flex flex-row space-x-4">
    {subFields.map((Setting, index) => (
      <Fragment key={index}>
        <div className="w-full">
          <Setting {...props} />
        </div>
      </Fragment>
    ))}
  </div>
);

SubFields.propTypes = {
  subFields: PropTypes.array.isRequired,
  settingClassName: PropTypes.any,
};

export default SubFields;
