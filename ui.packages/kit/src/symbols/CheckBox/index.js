
import types from 'prop-types';
import React from 'react';

import cn from 'classnames';
import styles from './default.module.scss';


const PRIMARY_MODE = 'primary';
const INFO_MODE = 'info';
const WARNING_MODE = 'warning';
const DANGER_MODE = 'danger';
const SUCCESS_MODE = 'success';


function Checkbox({ className, disabled, mode, value, label, onChange }) {
  function handleClick() {
    onChange && onChange( ! value);
  }

  const classNameButton = cn(className, styles['checkbox'], {
    [styles['checkbox--primary']]: mode === PRIMARY_MODE,
    [styles['checkbox--success']]: mode === SUCCESS_MODE,
    [styles['checkbox--info']]: mode === INFO_MODE,
    [styles['checkbox--danger']]: mode === DANGER_MODE,
    [styles['checkbox--warning']]: mode === WARNING_MODE,
    [styles['checkbox--disabled']]: disabled,
    [styles['checkbox--checked']]: value,
  });

  return (
    <div className={styles['wrapper']} onClick={handleClick}>
      <span className={classNameButton}>
        {value && <span className={cn(styles['checkbox__marker'], 'fas fa-check')} />}
      </span>
      {label && <label className={styles['label']}>{ label }</label>}
    </div>
  );
}

Checkbox.propTypes = {
  className: types.string,
  label: types.string,
  mode: types.oneOf(['info', 'primary', 'danger', 'warning', 'success', 'default']),
  disabled: types.bool,
  value: types.bool,
  onChange: types.func,
};

Checkbox.defaultProps = {
  mode: 'default',
  disabled: false,
  value: false,
  label: null,
};

export default Checkbox;
