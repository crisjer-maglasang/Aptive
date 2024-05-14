import Date from '@/modules/AdminTools/components/Form/Date';
import { planBuilderConstants } from '@/modules/AdminTools/lib/constants';

const { END_ON, END_ON_LABEL } = planBuilderConstants;

const EndDate = () => <Date name={END_ON} label={END_ON_LABEL} />;

export default EndDate;
