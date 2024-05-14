import { sptConstants } from '../lib';
import { AreaPolygonsTable } from '../components/AreaPolygonsTable';

const SalesPlanningAriaPolygons = () => (
  <div className="p-7">
    <div className="text-3xl pb-3.5 pt-11">
      {sptConstants.VIEW_POLYGONS}
    </div>
    <AreaPolygonsTable />
  </div>
);

export default SalesPlanningAriaPolygons;
