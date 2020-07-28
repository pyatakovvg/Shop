
import { Row, Col } from "@ui.packages/kit";

import { FieldArray } from "redux-form";
import React, { lazy, PureComponent, Suspense } from 'react';

import cn from 'classnames';
import styles from "./default.module.scss";


const Products = lazy(() => import(/* webpackChunkName: "order.products" */'./Products'));
const Details = lazy(() => import(/* webpackChunkName: "order.details" */'./Details'));
const Empty = lazy(() => import(/* webpackChunkName: "order.empty" */'./Empty'));


class Component extends PureComponent {
  render() {
    const { items, handleSubmit } = this.props;

    const hasProducts = !! Object.keys(items).length;

    return (
      <form onSubmit={handleSubmit}>
        <Row className={styles['row']}>
          <Col>
            <h2 className={styles['block__header']}>Выбранные товары</h2>
            <div className={cn(styles['block__content'], styles['block__content--no-border'])}>
              <Suspense fallback={null}>
                {hasProducts
                  ? <FieldArray name="items" component={Products} />
                  : <Empty />}
              </Suspense>
            </div>
          </Col>
        </Row>
        <Row className={styles['row']}>
          <Col>
            <h2 className={styles['block__header']}>Оформление заказа</h2>
            <div className={styles['block__content']}>
              <Suspense fallback={null}>
                <Details />
              </Suspense>
            </div>
          </Col>
        </Row>
      </form>
    );
  }
}

export default Component;
