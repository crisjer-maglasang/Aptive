export const getDefaultTeamId = (response) => {
  const { team_id: teamId } = response?.data?.data?.[0] ?? {};

  return { teamId };
};
