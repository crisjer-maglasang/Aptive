import PlansHeader from './PlansHeader';
import EmptyCheck from './EmptyCheck';
import PlansTable from './PlansTable';

const Plans = () => (
  <div className="m-6">
    <PlansHeader />
    <EmptyCheck>
      <PlansTable />
    </EmptyCheck>
  </div>
);

export default Plans;
