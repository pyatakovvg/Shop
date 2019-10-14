
import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';

import cn from 'classnames';
import styles from './default.module.scss';


class Component extends PureComponent {
  render() {
    const { items, location }  = this.props;
    return (
      <nav className={styles['navigate']}>
        {items.map((item, index) => {

          let match = null;
          let hasPath = false;
          let mainPath = location['pathname'];

          if ('navigate' in item) {
            hasPath = item['navigate'].some(item => {
              const regExp = new RegExp(item['path']);
              match = regExp.test(mainPath);
              return match;
            });
          }

          if ( ! hasPath) {
            const regExp = new RegExp(item['path']);
            match = regExp.test(mainPath);
          }

          const itemClassName = cn(styles['navigate__item'], {
            [styles['navigate__item--active']]: hasPath || match,
          });

          return (
            <span key={index} className={itemClassName}>
              <Link to={item['path']} className={styles['navigate__link']}>
                <span className={styles['navigate__text']}>{item['title']}</span>
              </Link>
            </span>
          );
        })}
      </nav>
    );
  }
}

export default Component;