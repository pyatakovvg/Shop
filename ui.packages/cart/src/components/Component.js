
import { Button } from '@ui.packages/kit';
import numeral from '@ui.packages/numeral';

import types from 'prop-types';
import { Link } from 'react-router-dom';
import React, { useEffect, useRef } from 'react';

import Icon from './Icon';
import Product from './Product';

import styles from './defaults.module.scss';


function calculateFullAmount(items) {
  const fullAmount = items.reduce((accumulator, product) => accumulator + product['amount'], 0);
  return numeral(fullAmount).format();
}


function Cart({ items, isOpen, match, closeCart, resetCart, removeProduct, push }) {
  const cartRef = useRef(null);

  useEffect(() => {
    function onClick(event) {
      const target = event.target;
      const { current: cartElement } = cartRef;

      if (cartElement && target && ! cartElement.contains(target)) {
        isOpen && closeCart();
      }
    }

    document.addEventListener('click', onClick, true);

    return () => {
      document.removeEventListener('click', onClick, true);
    };
  });

  function handleRemoveProductFromCart(id) {
    removeProduct(id);
  }

  function handleResetCart() {
    resetCart();
    closeCart();
  }

  function handleGoToCart() {
    closeCart();
    push('/order');
  }

  if (/order/.test(match['url'])) {
    return null;
  }

  const hasProductsInCart = !! items.length;
  const fullAmount = calculateFullAmount(items);

  return (
    <div ref={cartRef} className={styles['cart']}>
      <Icon />
      {isOpen && (
        <div className={styles['cart__list']}>
          <div className={styles['list']}>
            {hasProductsInCart
              ? (
                <div>
                  <div className={styles['list__content']}>
                    {items.map((item) => (
                      <Product
                        key={item['uuid']}
                        {...item}
                        onRemove={handleRemoveProductFromCart}
                      />
                    ))}
                  </div>
                  <div className={styles['list__info']}>
                    <p className={styles['cart__full-amount']}>Итого: { fullAmount } руб.</p>
                  </div>
                  <div className={styles['list__controls']}>
                    <Button onClick={handleResetCart}>Очистить</Button>
                    <Button onClick={handleGoToCart} mode="success">Оформить заказ</Button>
                  </div>
                </div>
              )
              : (
                <span className={styles['cart__empty']}>
                  В карзине нет выбранных товаров<br/>
                  перейдите в раздел <Link className={styles['link']} to={process.env['PUBLIC_URL'] + '/products'}>Витрина</Link> для выбора товаров
                </span>
              )
            }
          </div>
        </div>
      )}
    </div>
  );
}

Cart.propTypes = {
  items: types.array,
  isOpen: types.bool,
  match: types.object,
  closeCart: types.func,
  resetCart: types.func,
  removeProduct: types.func,
  push: types.func,
};

Cart.defaultProps = {
  items: [],
  isOpen: false,
};

export default Cart;
