
import types from 'prop-types';
import React, { PureComponent } from 'react';

import { Gallery } from '@ui.packages/ui';

import styles from './default.module.scss';


class Component extends PureComponent {
  static propTypes = {
    isSale: types.bool,
    isHit: types.bool,
    id: types.number,
    gallery: types.array,
    amount: types.number,
    brand: types.string,
    name: types.string,
    description: types.string,
    onView: types.func,
    onCart: types.func,
  };

  static defaultProps = {
    isSale: false,
    isHit: false,
    id: null,
    gallery: [],
    amount: 0.00,
    brand: 'None',
    name: 'None',
    description: ''
  };

  render() {
    const { gallery, brand, name } = this.props;
    return (
      <div className={styles['product']}>
        <div className={styles['product__promo']}>
          <Gallery items={gallery} valueKey="id" path={`${process.env['REACT_APP_API_HOST']}/gallery`} />
        </div>
        <div className={styles['product__info']}>
          <span className={styles['product__brand']}>{ brand }</span>
          <span className={styles['product__name']}>{ name }</span>
        </div>
      </div>
    );
  }
}

export default Component;