export const getDealers = (response) => {
  const teams = response?.data?.attributes ? [response.data] : response?.data ?? [];

  return teams.map((team) => {
    const {
      id: value,
      name,
    } = team?.attributes ?? {};

    return {
      name,
      value,
    };
  });
};

export const getPartnerships = (response) => {
  const partnerships = response?.data?.attributes ? [response.data] : response?.data ?? [];

  return partnerships.map((partnership) => {
    const {
      id: value,
      name,
    } = partnership?.attributes ?? {};

    return {
      value,
      name,
    };
  });
};
