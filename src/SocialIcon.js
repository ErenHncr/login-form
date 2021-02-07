import React, { Suspense } from 'react';
import PropTypes from 'prop-types';
import {
  Spinner,
} from 'reactstrap';

import getBrandUrl from './assets/social';

function SocialItem({ brand }) {
  return (
    <Suspense fallback={<Spinner className="mr-2" color="secondary" />}>
      <img
        src={getBrandUrl(brand)}
        className={`social-icon ${brand}`}
        alt="social"
      />
    </Suspense>
  );
}
SocialItem.propTypes = {
  brand: PropTypes.string.isRequired,
};
export default SocialItem;
