
import { Header } from '@ui.packages/kit';

import React from 'react';

import Table from './Table';

import styles from './default.module.scss';


function Currencies() {
   return (
    <section className={styles['wrapper']}>
      <div className={styles['header']}>
        <Header level={1}>Валюта</Header>
      </div>
      <article className={styles['content']}>
        <Table />
      </article>
    </section>
  );
}

Currencies.propTypes = {};

Currencies.defaultProps = {};

export default Currencies;