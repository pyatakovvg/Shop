
import React from 'react';

import styles from './default.module.scss';


export default () => {
  return (
    <section className={styles['container']}>
      <header className={styles['header']}>
        <h2>Возврат и обмен</h2>
      </header>
      <article className={styles['content']}>
        <p className={styles['paragraph']}>Мы даем всем нашим покупателям 14 дней на возврат или обмен товара!</p>
        <br/>
        <p className={styles['paragraph']}>При обнаружении вами в течение этого срока скрытых производственных дефектов, мы обязуемся выполнить следующие действия на выбор, при условии возврата изделия обратно в магазин:</p>
        <br/>
        <ui className={styles['list']}>
          <li>Вернуть уплаченную сумму за товар;</li>
          <li>Предоставить аналогичный товар;</li>
          <li>Предоставить другой товар из каталога в размере уплаченной суммы;</li>
        </ui>
        <br/>
        <br/>
        <p className={styles['paragraph']}>В течение 14 дней, если Вам не подойдет изделие или в случае неудовлетворения качеством нашего товара, мы возвращаем все деньги за товар при условии сохранения товарного вида и отсутствии следов эксплуатации изделия. Возврат денег осуществляется покупателю в течение 10 рабочих дней с момента получения нами возвращенного товара.</p>
        <br/>
        <br/>
        <br/>
        <div className={styles['attention']}>
          <h3>Важные исключения:</h3>
          <p className={styles['paragraph']}>Товар (готовые очки со стеклом) перед отправкой проверяется на сколы и царапины.</p>
          <p className={styles['paragraph']}>Товар (готовые очки со стеклом) возврату и обмену не подлежат.</p>
          <p className={styles['paragraph']}>Гарантия не распространяется на мелкие царапины и сколы линз, механические, температурные и химические повреждения очков (линз или оправы), произошедшие в ходе эксплуатации.</p>
          <p className={styles['paragraph']}>Изменение вашего зрения (диоптрий), также не гарантийный случай.</p>
        </div>
      </article>
    </section>
  );
}
