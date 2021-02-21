
import { on, off } from '@ui.packages/socket';
import { useMount, useUnmount, useUpdate } from '@ui.packages/hoc';

import React from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import Component from './Component';

import { getBrands, getTypes, getCurrencies, getCategories, getAttributes, getProductById } from '../ducks/commands';

import {
  resetStateAction,

  setProcessAction,

  deleteImageRequestSuccessAction,
  updateProductRequestSuccessAction,
} from '../ducks/slice';


export default function HOC() {
  const dispatch = useDispatch();
  const params = useParams();

  useMount(async function() {
    document.title = `${process.env['REACT_APP_WEBSITE_NAME']} - Редактирование товара`;

    dispatch(setProcessAction(true));
    await dispatch(getTypes());
    await dispatch(getBrands());
    await dispatch(getCategories());
    await dispatch(getCurrencies());
    await dispatch(getAttributes());
    dispatch(setProcessAction(false));

    if (params['id']) {
      await dispatch(getProductById(params['id']));
    }

    on(process.env['REACT_APP_SOCKET_IMAGE_DELETE'], (uuid) => dispatch(deleteImageRequestSuccessAction({ uuid })));
    on(process.env['REACT_APP_SOCKET_PRODUCT_UPDATE'], (data) => dispatch(updateProductRequestSuccessAction(data)));
  });

  useUpdate(async function() {

  });

  useUnmount(function() {
    dispatch(resetStateAction());

    off(process.env['REACT_APP_SOCKET_IMAGE_DELETE']);
    off(process.env['REACT_APP_SOCKET_PRODUCT_UPDATE']);
  });

  return <Component />;
}
