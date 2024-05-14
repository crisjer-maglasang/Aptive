import classNames from 'classnames';

const ApartmentWithBeds = ({
  apartment,
  onClick,
}) => {
  return (
    <div
      className={classNames(
        'flex justify-between border-t border-gray-200 p-6',
        { 'bg-gray-100': apartment.is_archived },
      )}
    >
      <div className="text-gray-600 w-1/5">{apartment.unit_id}</div>
      <div className="w-1/5">{`${apartment.total_rooms} ${apartment.total_rooms > 1 ? 'Rooms' : 'Room'}`}</div>
      <div className="w-1/5">
        {`Beds: ${apartment.available_beds}/${apartment.total_beds} available`}
      </div>
      <div className="w-1/5">
        {`Has couch: ${apartment.has_couch ? 'Yes' : 'No'}`}
      </div>
      <div className="flex-grow text-right">
        <button className="text-aptiveblue" onClick={onClick}>View</button>
      </div>
    </div>
  );
};

export default ApartmentWithBeds;
