import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

function InputWithStatus({
  id, name, type, val, placeholder, onChange,
}) {
  const [showPass, setShowPass] = useState(false);
  const passwordType = useMemo(() => {
    if (showPass) {
      return 'text';
    }
    return 'password';
  }, [showPass]);

  return (
    <div className="input-with-status">
      <i
        id={`icon-${id}`}
        className={classnames({
          bx: true,
          'input-icon': true,
          'bx-envelope': id === 'email',
          'bx-key': id === 'password',
        })}
      />
      <input
        autoComplete="off"
        id={id}
        name={name}
        type={type === 'password' ? passwordType : type}
        onChange={onChange}
        value={val}
        placeholder={placeholder}
      />
      {id !== 'password' && <i className="bx bx-error-circle" />}
      {id === 'password' && (
        /* eslint-disable-next-line */
        <i
          className={classnames({
            bx: true,
            'bx-hide': !showPass,
            'bx-show': showPass,
          })}
          onClick={() => setShowPass(!showPass)}
        />
      )}
    </div>
  );
}

InputWithStatus.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  val: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default InputWithStatus;
