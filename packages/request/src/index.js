
import axios from 'axios';
import Cookies from 'js-cookie';

import { push } from 'react-router-redux';

const defaultOptions = {
  method: 'get',
  url: '/',
  responseType: 'json',
};

let dispatch = null;
let hostApi = null;


export const middleware = (host) => (store) => (next) => (action) => {

  dispatch = store['dispatch'];
  hostApi = host;

  return next(action);
};

export default async (options) => {

  options = {
    ...defaultOptions,
    ...options,
  };

  console.log(3333, options);

  let cookies = Cookies.get('admin');
  if (cookies) {
    cookies = JSON.parse(cookies);
  }

  let headers = {};
  if (options['headers']) {
    headers = options['headers'];
  }
  if (cookies) {
    headers['Authorization'] = cookies['token'];
  }

  const instance = axios.create({
    baseURL: hostApi,
    timeout: 24000,
    headers: headers,
    withCredentials: false,
  });

  try {

    const { data } = await instance(options);

    return data;

  } catch(error) {
    const { status } = error['response'];

    console.log(111, error);

    if (status === 401) {
      dispatch(push('/sign-in'));
    }
  }
};
