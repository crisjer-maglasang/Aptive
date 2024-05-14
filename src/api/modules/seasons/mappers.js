export const getSalesSeason = (response) => {
  const {
    summer_start_date: summerStartDate,
    summer_end_date: summerEndDate,
  } = response?.data?.attributes ?? {};

  return { season: {
    summerStartDate,
    summerEndDate,
  } };
};
