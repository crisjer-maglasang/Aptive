import { Icon, Avatar } from '@/components/common';

const SidebarCard = (props) => {
  const { name, type_of_room, number_of_rooms } = props;

  return (
    <div className="flex justify-between py-2">
      <div className="flex items-center">
        <Avatar />
        <div className="flex flex-col ml-2">
          <span className="text-gray-900 text-sm leading-4 font-normal">
            {name}
          </span>
          <span className="text-gray-600 text-[10px] leading-3 font-normal">
            {type_of_room}
          </span>
          <span className=" text-gray-600 text-[10px] leading-3 font-normal">
            {type_of_room === 'Married' ? `${number_of_rooms} rooms` : null}
          </span>
        </div>
      </div>
      <button className="flex gap-1 items-center py-2 px-3 text-gray-400 font-normal text-xs">
        <Icon icon="plusInCircle" className="w-4 h-4" /> Assign
      </button>
    </div>
  );
};

export default SidebarCard;
