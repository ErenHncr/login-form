import React, { Suspense } from 'react';
import PropTypes from 'prop-types';
import {
  Spinner,
} from 'reactstrap';
import EN from './assets/flags/en.svg';
import DE from './assets/flags/de.svg';
import FR from './assets/flags/fr.svg';
import TR from './assets/flags/tr.svg';

const getFlagUrl = (lang) => {
  let flag = EN;
  switch (lang) {
    case 'EN':
      flag = EN;
      break;
    case 'DE':
      flag = DE;
      break;
    case 'FR':
      flag = FR;
      break;
    case 'TR':
      flag = TR;
      break;
    default:
      flag = EN;
      break;
  }
  return flag;
};

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
