import { PencilAltIcon } from '@heroicons/react/outline';

const NotesHeader = () => {
  return (
    <div className="px-4 py-5 flex border-b border-gray-200">
      <PencilAltIcon color="gray" className="mr-2 w-6 h-6" />
      <h2 className="font-semibold text-lg">
        Notes
      </h2>
    </div>
  );
};

export default NotesHeader;
