import { sptConstants } from './constants'

export const buildTeamColors = (teams) => {
  let teamColors = {}
  let teamColorIndex = 0
  for (const [teamId, data] of Object.entries(teams)) {
    teamColors[teamId] = sptConstants.TEAM_COLORS[teamColorIndex]
    teamColorIndex++
  }

  return teamColors
}
