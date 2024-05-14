import { RecruiterProgressTableHeader } from './RecruiterProgressTableHeader';
import { RecruiterProgressTableBody } from './RecruiterProgressTableBody';

const RecruitProgressTable = ({ offset, limit, recruitersData }) => {
  return (
    <>
      {recruitersData?.length > 0 ? (
        <div className="my-2 overflow-x-auto rounded md:h-40vh">
          <div className="inline-block  py-2 align-middle">
            <div className="border-b border-gray-200 shadow sm:rounded-lg">
              <table className="divide-y divide-gray-200 overflow-hidden">
                <RecruiterProgressTableHeader />
                {recruitersData?.length > 0 && (
                  <RecruiterProgressTableBody
                    data={recruitersData}
                    offset={offset}
                    limit={limit}
                  />
                )}
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center w-full bg-white">
          <span className="py-6">Data not found</span>
        </div>
      )}
    </>
  );
};

export default RecruitProgressTable;
