
import { reduceToArray } from '@ui.packages/utils';

import types from 'prop-types';
import React, { lazy, Suspense } from 'react';

import cn from 'classnames';
import styles from './default.module.scss';


const ProductWithFurther = lazy(() => import(/* webpackChunkName: "order.product-with-further" */'./ProductWithFurther'));
const ProductWithAnother = lazy(() => import(/* webpackChunkName: "order.product-with-another" */'./ProductWithAnother'));


function getSortedProducts(fields) {
  return fields.reduce((initial, field, index) => {
    const product = fields.get(index);

    if (product['params'] === 'further') {
      initial['further'].push({ ...product, field });
    }
    else {
      initial['another'].push(product);
    }

    return initial;
  }, {
    further: [],
    another: [],
  });
}

export default function Products({ fields }) {
  const products = getSortedProducts(fields);

  return (
    <Suspense fallback={null}>
      { !! products['another'].length && (
        <div className={styles['with-another']}>
          {reduceToArray(products['another'], 2, { fillNull: true }).map((line, index) => (
            <div key={index} className={styles['with-another__line']}>
              {line.map((product, index) => {
                return (
                  <div key={index} className={cn(styles['with-another__col'], {
                    [styles['with-another__col--no-border']]: ! product,
                  })}>
                    {product && <ProductWithAnother {...product} />}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      )}
      { !! products['further'].length && (
        <div className={styles['with-further']}>
          {products['further'].map((product, index) => {
            return <ProductWithFurther key={index} index={index} field={product['field']} {...product} />
          })}
        </div>
      )}
    </Suspense>
  );
}

Products.propTypes = {
  fields: types.object,
};

Products.defaultProps = {
  fields: {},
};
