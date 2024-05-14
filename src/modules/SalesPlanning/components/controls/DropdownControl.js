
import { DropdownButton } from '@/components';

const DropdownControl = ({
  label,
  options
}) => {
  return (
    <div className="leaflet-top leaflet-right mr-12 !z-[1001]">
      <div className="leaflet-control !cursor-pointer">
        <DropdownButton
          classNames="rounded-lg border-2 border-black/25"
          label={label}
          color="white"
          options={options}
        />
      </div>
    </div>
  );
};

export default DropdownControl;