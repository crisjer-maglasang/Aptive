import { sptConstants } from '../lib'
import { TeamsTable } from '../components/TeamsTable'

const SalesPlanningTeams = () => {
  return (
    <div className="p-7">
      <div className="text-3xl pb-3.5 pt-11">
        {sptConstants.VIEW_TEAMS}
      </div>
      <TeamsTable />
    </div>
  )
}

export default SalesPlanningTeams
