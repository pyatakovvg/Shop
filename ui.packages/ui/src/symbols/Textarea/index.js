
import types from 'prop-types';
import React, { PureComponent } from 'react';

import cn from 'classnames';
import styles from './default.module.scss';

const PRIMARY_MODE = 'primary';
const INFO_MODE = 'info';
const WARNING_MODE = 'warning';
const DANGER_MODE = 'danger';
const SUCCESS_MODE = 'success';


class Component extends PureComponent {
  static propTypes = {
    className: types.string,
    label: types.string,
    type: types.oneOf(['text', 'password']),
    mode: types.oneOf(['info', 'primary', 'danger', 'warning', 'success', 'default']),
    value: types.string,
    disabled: types.bool,
    message: types.string,
    onChange: types.func,
    onInput: types.func,
  };

  static defaultProps = {
    className: '',
    type: 'text',
    mode: 'default',
    label: null,
    message: null,
    value: '',
    disabled: false,
  };

  render() {
    const { className, disabled, mode, label, message, ...props } = this.props;
    const classNameInputWrapper = cn(className, styles['wrapper'], {
      [styles['wrapper--primary']]: mode === PRIMARY_MODE,
      [styles['wrapper--success']]: mode === SUCCESS_MODE,
      [styles['wrapper--info']]: mode === INFO_MODE,
      [styles['wrapper--danger']]: mode === DANGER_MODE,
      [styles['wrapper--warning']]: mode === WARNING_MODE,
      [styles['wrapper--disabled']]: disabled,
      [styles['wrapper--with-label']]: !! label,
    });
    return (
      <div className={classNameInputWrapper}>
        <div className={styles['container']}>
          {label && (
            <p className={styles['label']}>{ label }</p>
          )}
          <textarea className={styles['textarea']} disabled={disabled}  {...props} />
        </div>
        { ! disabled && message && (
          <div className={styles['controls']}>
            <span className={cn(styles['info__icon'], 'fas fa-exclamation-circle')} />
          </div>
        )}
      </div>
    );
  }
}

export default Component;