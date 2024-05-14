import { CloudUploadIcon } from '@heroicons/react/outline';

const UploadButton = () => {
  return (
    <div className="cursor-pointer w-[140px] h-[36px] pl-[11px] pr-[12px] py-2 bg-blue-600 rounded-lg flex-col justify-center items-center gap-2 inline-flex">
      <div className="justify-start items-center gap-[4px] inline-flex">
        <div className="w-[20px] h-[20px]">
          <CloudUploadIcon style={{ color: 'white' }} />
        </div>
        <div className="text-white text-[14px] font-medium leading-none">
          Upload image
        </div>
      </div>
    </div>
  );
};

export default UploadButton;
