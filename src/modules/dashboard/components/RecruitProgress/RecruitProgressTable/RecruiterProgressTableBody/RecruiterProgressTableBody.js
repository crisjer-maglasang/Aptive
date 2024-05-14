import { RecruiterProgressRow } from '../RecruiterProgressRow';

const RecruiterProgressTableBody = ({ offset, limit, data }) => {
  return (
    <tbody className="bg-white divide-y divide-gray-200">
    {data?.length > 0 && (
      data?.map((rep, index) => {
        if (index >= offset && index < offset + limit) {
          return (
            <RecruiterProgressRow
              key={rep?.id}
              recruiter={rep}
            />
          );
        }
      })
    )}
    </tbody>
  );
};

export default RecruiterProgressTableBody;
