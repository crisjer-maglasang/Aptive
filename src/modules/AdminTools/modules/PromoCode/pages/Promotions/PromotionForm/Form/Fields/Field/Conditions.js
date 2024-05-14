import Select from '@/modules/AdminTools/components/Form/Select';

const Conditions = (props) => (
  <Select
    isMulti
    label="Conditions"
    name="conditions"
    selector={() => []}
    error="promotionsUpdate"
    {...props}
  />
);

export default Conditions;
