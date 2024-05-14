export const getSeasonSummaries = (response) => {
  const seasonSummaries = response?.data?.attributes
    ? [response.data]
    : response?.data ?? [];

  return seasonSummaries.map((seasonSummary) => {
    const {
      name: label,
      is_current,
      is_sales,
      id: value,
    } = seasonSummary?.attributes ?? {};

    return {
      value,
      label,
      is_current,
      is_sales,
    };
  });
};
