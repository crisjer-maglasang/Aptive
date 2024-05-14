const Field = ({ Edit, remove }) => {
  return (
    <div className="flex flex-col w-full space-y-2">
      <hr />
      <div className="px-4">
        <div className="flex flex-row w-full">
          <div className="flex-grow w-full" />
          <div onClick={remove} className="cursor-pointer text-red-500">
            remove
          </div>
        </div>
        <div className="flex-grow w-full">
          <Edit />
        </div>
      </div>
    </div>
  );
};

export default Field;
