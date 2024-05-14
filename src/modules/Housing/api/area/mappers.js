export const getTeamsSummaries = (response) => {
  const teams = response?.data?.attributes ? [response.data] : response?.data ?? [];

  return teams.map((team) => {
    const {
      id: value,
      name: label,
    } = team?.attributes ?? {};

    return {
      value,
      label,
    };
  });
};

export const getBranchesSummaries = (response) => {
  const branches = response?.data?.attributes ? [response.data] : response?.data ?? [];

  return branches.map((branch) => {
    const {
      id: value,
      name,
    } = branch?.attributes ?? {};

    return {
      value,
      name,
    };
  });
};

export const getDealers = (response) => {
  const dealers = response?.data?.attributes ? [response.data] : response?.data ?? [];

  return dealers.map((dealer) => {
    const {
      id: value,
      name,
    } = dealer?.attributes ?? {};

    return {
      value,
      name,
    };
  });
};
