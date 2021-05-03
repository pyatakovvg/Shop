
import numeral from '@packages/numeral';
import { Gallery, Header, Text, Link, Count } from '@ui.packages/kit';
import {
  selectUuid,
  selectInProcess,
  removeProductFromCartAction,
  plusQuantityAction,
  minusQuantityAction,
  selectAmount
} from '@ui.packages/cart-widget';

import React, {useState} from 'react';
import types from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';

import cn from 'classnames';
import styles from './default.module.scss';
import {closeDialog, Confirm, openDialog} from "@ui.packages/dialog";


export default function Product({ uuid, price, brand, name, gallery, promotion }) {
  const dispatch = useDispatch();
  const uuids = useSelector(selectUuid);
  const amounts = useSelector(selectAmount);
  const inProcess = useSelector(selectInProcess);
  const product = uuids.find((item) => item[0] === uuid);
  const [removedUuid, setRemovedUuid] = useState(null);

  const removeFromCartClassName= cn(styles['remove'], 'far fa-trash-alt');

  function handlePlus() {
    dispatch(plusQuantityAction(uuid));
  }

  function handleMinus() {
    dispatch(minusQuantityAction(uuid));
  }

  function handleConfirmRemove() {
    setRemovedUuid(null);
    dispatch(closeDialog('remove-from-cart-order' + uuid));
    dispatch(removeProductFromCartAction(removedUuid));
  }

  function handleRemoveProductFromCart(event) {
    event.preventDefault();
    event.stopPropagation();

    setRemovedUuid(uuid);
    dispatch(openDialog('remove-from-cart-order' + uuid));
  }

  function handleCancelRemove() {
    setRemovedUuid(null);
    dispatch(closeDialog('remove-from-cart-order' + uuid));
  }

  if ( ! product) {
    return null;
  }

  return (
    <div>
      <Link className={styles['wrapper']} href={`/products/${uuid}`}>
        <span className={removeFromCartClassName} onClick={(event) => handleRemoveProductFromCart(event)} />
        {promotion && (
          <span className={styles['discount']}>{ promotion['percent'] }%</span>
        )}
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
              <Text type="uuid">Код: { uuid }</Text>
            </div>
          </div>
          <div className={styles['amount']}>
            <div className={styles['price']}>
            <span className={styles['count']}>
              <Count number={product[1]} disabled={inProcess} onPlus={handlePlus} onMinus={handleMinus} />
            </span>
              <span className={styles['number']}>
              <Text type={Text.TYPE_AMOUNT}>x { numeral(price).format() } { amounts.map((amount) => amount[2]) }</Text>
            </span>
            </div>
            <div className={styles['full-price']}>
              <Text type={Text.TYPE_COMMENT}>= { numeral(price * product[1]).format() } { amounts.map((amount) => amount[2]) }</Text>
            </div>
          </div>
        </div>
      </Link>

      <Confirm
        name={'remove-from-cart-order' + uuid}
        message={'Вы точно хотите удалить товар из карзины?'}
        onConfirm={() => handleConfirmRemove()}
        onCancel={() => handleCancelRemove()}
      />
    </div>

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
