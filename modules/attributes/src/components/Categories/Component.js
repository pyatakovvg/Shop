
import { Dialog } from '@ui.packages/dialog';
import { Button, Actions } from '@ui.packages/kit';
import { Table, Column } from '@ui.packages/table';

import types from 'prop-types';
import React, { PureComponent } from 'react';

import Form from '../_FormModify';

import styles from './default.module.scss';


class Component extends PureComponent {
  static propTypes = {
    items: types.array,
    openDialog: types.func,
    closeDialog: types.func,
    createCategory: types.func,
    updateCategory: types.func,
    deleteCategories: types.func,
  };

  static defaultProps = {
    items: [],
  };

  _handleCreate() {
    const { openDialog } = this.props;
    openDialog('category');
  }

  _handleEdit(value) {
    const { openDialog } = this.props;
    openDialog('category', value);
  }

  _handleDelete(id) {
    const { deleteCategories } = this.props;
    deleteCategories([ id ]);
  }

  _submitModify(data) {
    const { createCategory, updateCategory } = this.props;

    if ('id' in data) {
      updateCategory(data);
    }
    else {
      createCategory(data);
    }
  }

  render() {
    const { items } = this.props;

    return (
      <div className={styles['content']}>
        <div className={styles['table']}>
          <Table columns={items}>
            <Column
              title="Значение"
              alias="value"
              width="200"
              align="left"
            />
            <Column
              title="Описание"
              alias="description"
              align="left"
            />
            <Column
              title="Описание"
              alias="imageId"
            >{(value) => {
              return value ? <img src={`${process.env['REACT_APP_API_HOST']}/gallery/${value}`} width="40" alt="" /> : null;
            }}
            </Column>
            <Column
              align="right"
              width="40"
            >
              {(value) => <Actions onEdit={this._handleEdit.bind(this, value)} onDelete={this._handleDelete.bind(this, value['id'])} />}
            </Column>
          </Table>
        </div>
        <div className={styles['controls']}>
          <Button mode="success" onClick={this._handleCreate.bind(this)}>Добавить</Button>
        </div>
        <Dialog title="Категория продукта" name="category">
          <Form hasImage={true} onSubmit={this._submitModify.bind(this)} />
        </Dialog>
      </div>
    );
  }
}

export default Component;