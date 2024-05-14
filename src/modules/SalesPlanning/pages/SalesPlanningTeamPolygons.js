import { sptConstants } from '../lib';
import { TeamPolygonsTable } from '../components/TeamPolygonsTable';

const SalesPlanningTeamPolygons = () => (
  <div className="p-7">
    <div className="text-3xl pb-3.5 pt-11">
      {sptConstants.VIEW_POLYGONS}
    </div>
    <TeamPolygonsTable />
  </div>
);

export default SalesPlanningTeamPolygons;
