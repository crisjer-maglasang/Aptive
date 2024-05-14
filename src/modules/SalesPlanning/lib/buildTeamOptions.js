export const buildTeamOptions = (teams) => {
    const teamsOptions = []
    for (const [teamId, team] of Object.entries(teams)) {
        teamsOptions.push({
            name: team.name,
            value: team.team_id
        })
    }

    return teamsOptions
}