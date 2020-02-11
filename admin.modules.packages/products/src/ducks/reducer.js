
import {
  SIGN_OUT,

  GET_PRODUCTS_REQUEST,
  GET_PRODUCTS_REQUEST_FAIL,
  GET_PRODUCTS_REQUEST_SUCCESS,

  CREATE_PRODUCTS_REQUEST,
  CREATE_PRODUCTS_REQUEST_FAIL,
  CREATE_PRODUCTS_REQUEST_SUCCESS,

  REMOVE_PRODUCT_REQUEST,
  REMOVE_PRODUCT_REQUEST_FAIL,
  REMOVE_PRODUCT_REQUEST_SUCCESS,

  SOCKET_PRODUCT_CREATED,
  SOCKET_PRODUCT_UPDATED,
  SOCKET_PRODUCT_DELETED,
} from './types';


export const KEY = 'Products';


const initialState = {
  items: [],
  meta: {},
};


export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SIGN_OUT: return {
      ...initialState,
    };

    case GET_PRODUCTS_REQUEST: return {
      ...state,
    };
    case GET_PRODUCTS_REQUEST_FAIL: return {
      ...state,
    };
    case GET_PRODUCTS_REQUEST_SUCCESS: return {
      ...state,
      items: payload['data'],
      meta: payload['meta'],
    };

    case CREATE_PRODUCTS_REQUEST: return {
      ...state,
    };
    case CREATE_PRODUCTS_REQUEST_FAIL: return {
      ...state,
    };
    case CREATE_PRODUCTS_REQUEST_SUCCESS: return {
      ...state,
      items: [...state['items'], payload].sort((left, right) => {
        if (left['id'] > right['id']) {
          return 1;
        }
        else if (left['id'] < right['id']) {
          return -1;
        }
        return 0;
      }),
    };

    case REMOVE_PRODUCT_REQUEST: return {
      ...state,
    };
    case REMOVE_PRODUCT_REQUEST_FAIL: return {
      ...state,
    };
    case REMOVE_PRODUCT_REQUEST_SUCCESS: return {
      ...state,
      items: [...state['items']].filter((item) => (payload.indexOf(item['id']) === -1)),
    };

    default: return { ...state };
  }
}