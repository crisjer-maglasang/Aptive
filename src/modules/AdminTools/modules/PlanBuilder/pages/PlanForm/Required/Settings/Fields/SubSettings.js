import PropTypes from 'prop-types';
import { Fragment } from 'react';

const SubSettings = ({ subSettings }) => (
  <div className="flex flex-row space-x-4">
    {subSettings.map((setting, index) => (
      <Fragment key={index}>
        <div className="w-full">{setting()}</div>
      </Fragment>
    ))}
  </div>
);

SubSettings.propTypes = {
  subSettings: PropTypes.array.isRequired,
};

export default SubSettings;
