
import types from 'prop-types';
import React, { PureComponent } from 'react';

import { Row, Col } from '@ui.packages/ui';
import { Tabs, Tab, TabContainer } from '@ui.packages/tabs';

import cn from 'classnames';
import styles from './default.module.scss';


class Component extends PureComponent {
  static propTypes = {
    onChange: types.func,
  };

  constructor(props) {
    super(props);

    this.state = {
      type: props['type'] || -1,
      part: props['part'] || 'eye-glasses',
    };
  }

  _handleChangeTab(part) {
    const { onChange } = this.props;
    this.setState({ part, type: -1 }, () => onChange(this.state));
  }

  _handleSelectType(type) {
    const { onChange } = this.props;
    this.setState({ type }, () => onChange(this.state));
  }

  render() {
    const { type, part } = this.state;
    return (
      <Tabs name="type" defaultTab={part} onChange={this._handleChangeTab.bind(this)}>
        <div className={styles['tabs']}>
          <Tab name="eye-glasses" caption="Очки для зрения" />
          <Tab name="progressive" caption="Прогрессивы" />
          <Tab name="bifocal" caption="Бифокалы" />
          <Tab name="digress" caption="Дегрессивы" />
        </div>
        <div className={styles['content']}>
          <TabContainer to="eye-glasses">
            <Row>
              <Col>
                <div className={cn(styles['card'], {[styles['card--active']]: type === 3})} onClick={this._handleSelectType.bind(this, 3)}>
                  <h3 className={styles['card__header']}>Для дали</h3>
                  <p className={styles['card__description']}>Линзы для улучшения видимости на расстоянии</p>
                </div>
              </Col>
              <Col>
                <div className={cn(styles['card'], {[styles['card--active']]: type === 4})} onClick={this._handleSelectType.bind(this, 4)}>
                  <h3 className={styles['card__header']}>Для чтения</h3>
                  <p className={styles['card__description']}>Линзы для чтения и работы на близком расстоянии</p>
                </div>
              </Col>
              <Col>
                <div className={cn(styles['card'], {[styles['card--active']]: type === 5})} onClick={this._handleSelectType.bind(this, 5)}>
                  <h3 className={styles['card__header']}>Для средней дистанции</h3>
                  <p className={styles['card__description']}>Линзы для работы на средней дистанции - например, за компьютером или чтением книг</p>
                </div>
              </Col>
              <Col/>
            </Row>
          </TabContainer>
          <TabContainer to="progressive">
            <Row>
              <Col>
                <div className={cn(styles['card'], {[styles['card--active']]: type === 6})} onClick={this._handleSelectType.bind(this, 6)}>
                  <h3 className={styles['card__header']}>Standard</h3>
                  <p className={styles['card__description']}>Линзы корректирующие три вида зрения- вдаль, вблизь и на среднее расстояние</p>
                </div>
              </Col>
              <Col>
                <div className={cn(styles['card'], {[styles['card--active']]: type === 7})} onClick={this._handleSelectType.bind(this, 7)}>
                  <h3 className={styles['card__header']}>Premium</h3>
                  <p className={styles['card__description']}>Линзы с неровной поверхностью для расширения зон видения</p>
                </div>
              </Col>
              <Col>
                <div className={cn(styles['card'], {[styles['card--active']]: type === 8})} onClick={this._handleSelectType.bind(this, 8)}>
                  <h3 className={styles['card__header']}>Elite</h3>
                  <p className={styles['card__description']}>Компьютерное нивелирование боковых аберраций</p>
                </div>
              </Col>
              <Col/>
            </Row>
          </TabContainer>
          <TabContainer to="bifocal">
            <Row>
              <Col>
                <div className={cn(styles['card'], {[styles['card--active']]: type === 9})} onClick={this._handleSelectType.bind(this, 9)}>
                  <h3 className={styles['card__header']}>R28</h3>
                  <p className={styles['card__description']}>Округлый сегмент в зоне чтения. Для рецептов с положительными диоптриями.</p>
                </div>
              </Col>
              <Col>
                <div className={cn(styles['card'], {[styles['card--active']]: type === 10})} onClick={this._handleSelectType.bind(this, 10)}>
                  <h3 className={styles['card__header']}>D28</h3>
                  <p className={styles['card__description']}>Наиболее популярные с D-образным сегментом 28мм в зоне чтения.</p>
                </div>
              </Col>
              <Col>
                <div className={cn(styles['card'], {[styles['card--active']]: type === 11})} onClick={this._handleSelectType.bind(this, 11)}>
                  <h3 className={styles['card__header']}>D35</h3>
                  <p className={styles['card__description']}>Большой D-образный сегмент 35мм в зоне чтения.</p>
                </div>
              </Col>
              <Col>
                <div className={cn(styles['card'], {[styles['card--active']]: type === 12})} onClick={this._handleSelectType.bind(this, 12)}>
                  <h3 className={styles['card__header']}>C28</h3>
                  <p className={styles['card__description']}>Сглаженная линия перехода сегмента для чтения в верхней части.</p>
                </div>
              </Col>
            </Row>
          </TabContainer>
          <TabContainer to="digress">
            <Row>
              <Col>
                <div className={cn(styles['card'], {[styles['card--active']]: type === 13})} onClick={this._handleSelectType.bind(this, 13)}>
                  <h3 className={styles['card__header']}>Дегрессивные линзы</h3>
                  <p className={styles['card__description']}>Линзы для работы на близких и средних расстояниях.</p>
                </div>
              </Col>
              <Col/>
              <Col/>
              <Col/>
            </Row>
          </TabContainer>
        </div>
      </Tabs>
    );
  }
}

export default Component;