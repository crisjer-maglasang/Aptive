import { memo } from 'react';
import PropTypes from 'prop-types';

const List = memo(({ listItems }) => {
  return (
    <ul className="list-disc list-inside">
      {listItems.map((item, i) => (
        <li key={`listItem-${i}`} className="font-normal">{item}</li>
      ))}
    </ul>
  );
});

List.propTypes = {
  listItems: PropTypes.arrayOf(PropTypes.string),
};

export default List;
