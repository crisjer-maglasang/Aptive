import PropTypes from 'prop-types';
import { Fragment } from 'react';

import ProductName from '@/modules/AdminTools/modules/PlanBuilder/components/ProductName';
import Labeled from '@/modules/AdminTools/components/Labeled';

const Services = ({ services }) => {
  return (
    <Labeled label="Services">
      {services.map((productId, index) => (
        <Fragment key={productId}>
          <ProductName {...{ productId }} />
          {index < services.length - 1 && <>{', '}</>}
        </Fragment>
      ))}
    </Labeled>
  );
};

Services.propTypes = {
  services: PropTypes.array,
};

export default Services;
