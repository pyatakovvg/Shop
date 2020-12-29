
import React, { useEffect } from 'react';

import Header from './Header';
import Footer from './Footer';
import Navigation from './Navigation';

import styles from './default.module.scss';


function NavigateModule({ children }) {

  useEffect(() => {
    console.log('wrapper mount');
    return () => {
      console.log('wrapper unmount')
    }
  }, []);

  return (
    <section className={styles['wrapper']}>
      <section className={styles['page']}>
        <aside className={styles['aside']}>
          <header className={styles['header']}>
            <div className={styles['center']}>
              <Header />
            </div>
          </header>
          <div className={styles['navigate']}>
            <div className={styles['center']}>
              <div className={styles['menu']}>
                <Navigation />
              </div>
            </div>
          </div>
        </aside>
        <section className={styles['content']}>
          { children }
        </section>
      </section>
      <footer className={styles['footer']}>
        <div className={styles['center']}>
          <Footer />
        </div>
      </footer>
    </section>
  );
}

export default NavigateModule;