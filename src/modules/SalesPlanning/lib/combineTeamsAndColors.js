export const combineTeamsAndColors = (areaTeams, teamColors) => {
  let teamData = {}
  for (const [teamId, team] of Object.entries(areaTeams)) {
    teamData[teamId] = {
      active_customers: team.active_customers ?? 0,
      color: teamColors[team.team_id],
      inactive_customers: team.inactive_customers ?? 0,
      manager: team.manager,
      team_leaders: team.team_leaders || [],
      percentage_assigned: Math.round(team.percentage_assigned) ?? 0,
      qualified_addresses: team.total_qualified_addresses ?? 0,
      total_reps: Number(team.total_reps),
      team_id: team.team_id,
      team_name: team.name,
      total_addresses: team.total_addresses ?? 0,
    }
  }

  return teamData
}