
import numeral from '@packages/numeral';

import { nounDeclension } from "@ui.packages/utils";
import { Header, Text, Button, Link } from '@ui.packages/kit';
import { addProductToCartAction, removeProductFromCartAction, selectUuid } from '@ui.packages/cart-widget';

import React from 'react';
import types from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';

import cn from "classnames";
import styles from './default.module.scss';


function Product({ uuid, brand, name, price, currency }) {
  const dispatch = useDispatch();
  const cart = useSelector(selectUuid);

  function handleAddToCart() {
    dispatch(addProductToCartAction(uuid));
  }

  function handleRemoveFromCart() {
    dispatch(removeProductFromCartAction(uuid));
  }

  const product = cart.find((item) => item[0] === uuid);
  const removeFromCartClassName= cn(styles['remove'], 'far fa-trash-alt');

  return (
    <div className={styles['wrapper']}>
      <div className={styles['left']}>
        <div className={styles['brand']}>
          <Header level={2}>{ name }</Header>
        </div>
        {name && (
          <div className={styles['name']}>
            <Text type={Text.TYPE_COMMENT}>{ brand }</Text>
          </div>
        )}
        <div className={styles['uuid']}>
          <Text type={Text.TYPE_UUID}>Код: { uuid }</Text>
        </div>
      </div>
      <div className={styles['right']}>
        <div className={styles['amount']}>
          <Text type={Text.TYPE_AMOUNT}>{ numeral(price).format() } { currency }</Text>
        </div>
        <div className={styles['controls']}>
          <div className={styles['buttons']}>
            <Button form={Button.FORM_BAY} onClick={() => handleAddToCart()} />
            <Button form={Button.FORM_CART} onClick={() => handleAddToCart()} />
            { !! product && (
              <span className={removeFromCartClassName} onClick={() => handleRemoveFromCart()} />
            )}
          </div>
          { !! product && (
            <div className={styles['cart']}>
              <>
                {nounDeclension(product[1], ['Добавлен', 'Добавлено', 'Добавлено'])}&nbsp;
                {product[1]}&nbsp;
                {nounDeclension(product[1], ['товар', 'товара', 'товаров'])}.&nbsp;
                <Link className={styles['to-order']} href={'/order'}>Перейти к оформлению заказа</Link>
              </>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

Product.propTypes = {
  uuid: types.string,
  price: types.number,
  saleAmount: types.number,
  currency: types.string,
  brand: types.string,
  name: types.string,
};

Product.defaultProps = {
  uuid: null,
  isSale: false,
  isHit: false,
  amount: 0.00,
  saleAmount: 0.00,
  currency: {
    value: '',
  },
  brand: 'None',
  name: 'None',
};

export default Product;
