export const prepareDataForUpdateRepsStatus = ({ status, reps, ...params }) => {
  return {
    status,
    user_ids: reps,
    ...params,
  };
};
