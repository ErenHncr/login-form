import React, { Suspense } from 'react';
import PropTypes from 'prop-types';
import {
  Spinner,
} from 'reactstrap';
import getFlagUrl from './assets/flags';

function FlagItem({ language }) {
  return (
    <Suspense fallback={<Spinner className="mr-2" color="secondary" />}>
      <img
        src={getFlagUrl(language)}
        className="language-flag"
        alt="language flag"
        style={{
          borderRadius: '3px',
        }}
      />
    </Suspense>
  );
}
FlagItem.propTypes = {
  language: PropTypes.string.isRequired,
};
export default FlagItem;
