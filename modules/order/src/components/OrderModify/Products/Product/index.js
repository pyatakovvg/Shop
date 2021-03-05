
import numeral from '@packages/numeral';
import { Gallery, Header, Text, Link, Count } from '@ui.packages/kit';
import { selectUuid, selectInProcess, removeProductFromCartAction, plusQuantityAction, minusQuantityAction } from '@ui.packages/cart-widget';

import React from 'react';
import types from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';

import cn from 'classnames';
import styles from './default.module.scss';


export default function Product({ uuid, price, currency, brand, name, gallery }) {
  const dispatch = useDispatch();
  const uuids = useSelector(selectUuid);
  const inProcess = useSelector(selectInProcess);
  const product = uuids.find((item) => item[0] === uuid);

  const removeFromCartClassName= cn(styles['remove'], 'far fa-trash-alt');

  function handleRemoveFromCart(event) {
    event.preventDefault();
    event.stopPropagation();

    dispatch(removeProductFromCartAction());
  }

  function handlePlus() {
    dispatch(plusQuantityAction(uuid));
  }

  function handleMinus() {
    dispatch(minusQuantityAction(uuid));
  }

  if ( ! product) {
    return null;
  }

  return (
    <Link className={styles['wrapper']} href={`/products/${uuid}`}>
      <span className={removeFromCartClassName} onClick={(event) => handleRemoveFromCart(event)} />
      <div className={styles['gallery']}>
        <Gallery items={gallery} isList={false} size="middle" path={`${process.env['REACT_APP_API_HOST']}/gallery`} />
      </div>
      <div className={styles['common']}>
        <div className={styles['description']}>
          <div className={styles['name']}>
            <Header level={3}>{ name }</Header>
          </div>
          <div className={styles['brand']}>
            <Text type={Text.TYPE_COMMENT}>{ brand }</Text>
          </div>
          <div className={styles['uuid']}>
            <Text type="uuid">{ uuid }</Text>
          </div>
        </div>
        <div className={styles['amount']}>
          <Count number={product[1]} disabled={inProcess} onPlus={() => handlePlus()} onMinus={() => handleMinus()} />
          <Text type={Text.TYPE_AMOUNT}>{ product[1] } x { numeral(price).format() } { currency }</Text>
          <Text type={Text.TYPE_COMMENT}>{ numeral(price * product[1]).format() } { currency }</Text>
        </div>
      </div>
    </Link>
  );
}

Product.propTypes = {
  uuid: types.string,
  cart: types.array,
  gallery: types.array,
  price: types.number,
  brand: types.string,
  name: types.string,

  onView: types.func,
  onCart: types.func,
};

Product.defaultProps = {
  uuid: null,
  cart: [],
  gallery: [],
  price: 0.00,
  brand: 'None',
  name: 'None',

  onView: null,
  onCart: null,
};
