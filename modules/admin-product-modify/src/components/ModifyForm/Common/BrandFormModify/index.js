
import { reduxForm } from 'redux-form';

import Component from './Component';


const validate = (values) => {
  const errors = {};

  if ( ! values['value']) {
    errors['value'] = 'Необходимо заполнить';
  }

  return errors;
};


export default reduxForm({
  form: 'types-modify',
  validate,
})(Component);
