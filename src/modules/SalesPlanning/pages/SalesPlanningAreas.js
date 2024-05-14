import { AreasTable } from '../components/AreasTable'
import { sptConstants } from '../lib';

const SalesPlanningAreas = () => {
  return (
    <div className="p-7">
      <div className="text-3xl pb-3.5 pt-11">
        {sptConstants.VIEW_AREAS}
      </div>
      <AreasTable />
    </div>
  )
}

export default SalesPlanningAreas
