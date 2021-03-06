
import { UnauthorizedError } from '@packages/errors';

import { Mode } from '@ui.packages/types';
import request from '@ui.packages/request';
import { uniqName } from '@ui.packages/utils';
import { pushNotification } from '@ui.packages/notifications';

import {
  getPromotionsRequestAction,
  getPromotionsRequestFailAction,
  getPromotionsRequestSuccessAction,

  getProductsRequestAction,
  getProductsRequestFailAction,
  getProductsRequestSuccessAction,

  removeProductRequestAction,
  removeProductRequestFailRequest,
  removeProductRequestSuccessAction,

  copyProductRequestAction,
  copyProductRequestFailRequest,
  copyProductRequestSuccessAction,

  updateProductsRequestAction,
  updateProductsRequestFailAction,
  updateProductsRequestSuccessAction,
} from './slice';


export const getProducts = (params = {}) => async (dispatch) => {
  try {
    dispatch(getProductsRequestAction());

    const result = await request({
      url: '/products',
      method: 'get',
      params,
    });

    dispatch(getProductsRequestSuccessAction(result));

    if (document.querySelector('#scroller')) {
      document.querySelector('#scroller').scroll(0, 0);
    }

    return true;
  }
  catch(error) {
    dispatch(getProductsRequestFailAction());

    if (error instanceof UnauthorizedError) {
      return void 0;
    }
    dispatch(pushNotification({
      title: 'Ошибка при запросе данных',
      connect: `${error['data']['message']} (${error['data']['code']})`,
      mode: Mode.DANGER,
      autoClose: false,
    }));

    return false;
  }
};

export const removeProductById = (uuid, params) => async (dispatch) => {
  try {
    dispatch(removeProductRequestAction());

    await request({
      method: 'delete',
      url: `/products`,
      data: { uuid },
    });

    const result = await request({
      url: '/products',
      method: 'get',
      params,
    });

    dispatch(getProductsRequestSuccessAction(result));
    dispatch(removeProductRequestSuccessAction());

    dispatch(pushNotification({
      title: 'Продукт удален',
      mode: Mode.SUCCESS,
    }));
  }
  catch(error) {
    dispatch(removeProductRequestFailRequest(error));

    if (error instanceof UnauthorizedError) {
      return void 0;
    }
    dispatch(pushNotification({
      title: 'Ошибка при удаленнии продукта',
      connect: `${error['data']['message']} (${error['data']['code']})`,
      mode: Mode.DANGER,
      autoClose: false,
    }));
  }
};

export const copyProductById = (uuid) => async (dispatch) => {
  try {
    dispatch(copyProductRequestAction());

    const result = await request({
      method: 'post',
      url: `/products/${uuid}/copy`,
      data: {
        uuid: uniqName(),
      },
    });

    dispatch(copyProductRequestSuccessAction(result['data']));
    dispatch(pushNotification({
      title: 'Операция выполнена успешно',
      mode: Mode.SUCCESS,
    }));
  }
  catch(error) {
    dispatch(copyProductRequestFailRequest(error));

    if (error instanceof UnauthorizedError) {
      return void 0;
    }
    dispatch(pushNotification({
      title: 'Ошибка при удаленнии продукта',
      connect: `${error['data']['message']} (${error['data']['code']})`,
      mode: Mode.DANGER,
      autoClose: false,
    }));
  }
};

export const updateStatusProductById = (uuid, isView) => async (dispatch) => {
  try {
    dispatch(updateProductsRequestAction());

    const result = await request({
      url: `/products/${uuid}/status`,
      method: 'put',
      data: {
        isView,
      },
    });

    dispatch(updateProductsRequestSuccessAction(result['data']));
    dispatch(pushNotification({
      title: 'Операция выполнена успешно',
      mode: Mode.SUCCESS,
    }));
  }
  catch(error) {
    dispatch(updateProductsRequestFailAction(error));

    if (error instanceof UnauthorizedError) {
      return void 0;
    }
    dispatch(pushNotification({
      title: 'Ошибка при выполнении операции',
      mode: Mode.DANGER,
      autoClose: false,
    }));
  }
};

export const getPromotions = (params = {}) => async (dispatch) => {
  try {
    dispatch(getPromotionsRequestAction());

    const { data } = await request({
      url: '/promotions',
      method: 'get',
      params,
    });

    dispatch(getPromotionsRequestSuccessAction(data));

    return true;
  }
  catch(error) {
    dispatch(getPromotionsRequestFailAction());

    if (error instanceof UnauthorizedError) {
      return void 0;
    }
    dispatch(pushNotification({
      title: 'Ошибка при запросе данных',
      connect: `${error['data']['message']} (${error['data']['code']})`,
      mode: Mode.DANGER,
      autoClose: false,
    }));

    return false;
  }
};