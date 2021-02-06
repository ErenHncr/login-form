import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import EN from './assets/flags/en.svg';
import DE from './assets/flags/de.svg';
import FR from './assets/flags/fr.svg';
import TR from './assets/flags/tr.svg';
// import EN from './assets/flags/english.svg';
// import DE from './assets/flags/german.svg';
// import FR from './assets/flags/french.svg';
// import TR from './assets/flags/turkish.svg';

function FlagItem({ language }) {
  const [currentFlag, setCurrentFlag] = useState(EN);
  useEffect(() => {
    let flag = EN;
    switch (language) {
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
    setCurrentFlag(flag);
  }, [language]);
  return (
    <img
      src={currentFlag}
      width="28"
      alt="language flag"
      style={{
        borderRadius: '3px',
      }}
    />
  );
}
FlagItem.propTypes = {
  language: PropTypes.string.isRequired,
};
export default FlagItem;
