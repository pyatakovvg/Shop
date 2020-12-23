
import logger from '@sys.packages/logger';
import {
  NetworkError,
  NotfoundError,
  BadRequestError,
  ValidationError,
  UnavailableError,
  UnauthorizedError,
  MethodNotAllowedError,
} from '@packages/errors';

import axios from 'axios';


const defaultOptions = {
  method: 'get',
  url: '/',
  responseType: 'json',
  withCredentials: false,
};


const requestLogger = (config) => {
  let requestData = null;
  const { url, method, params = null, data = null } = config;

  if (params) {
    requestData = JSON.stringify(params);
  }

  if (data) {
    requestData = JSON.stringify(config['data']);
  }

  logger['info'](`[${method.toLocaleUpperCase()}] ---> "${url}" (${requestData})`);

  return config;
};

const responseLogger = (response) => {
  let responseData = null;
  const { config: { url, method, responseType }, status, data = null } = response;

  if (responseType === 'json' && data) {
    responseData = JSON.stringify(data);
  }

  logger['info'](`[${method.toLocaleUpperCase()}] <--- "${url}" [${status}] (${responseData})`);

  return response;
};

const errorLogger = (error) => {
  let status = 0;
  let data = null;
  const { config: { url, method }, response } = error;

  if (response) {
    status = response['status'];
    if ('data' in response) {
      data = JSON.stringify(response.data);
    }
  }

  logger['error'](`[${method.toLocaleUpperCase()}] <--- "${url}" [${status}] (${data})`);

  if ('errno' in error) {
    if (error['errno'] === 'ECONNREFUSED') {
      return Promise.reject(new NetworkError('Сервис временно недоступен'));
    }
  }

  if (response) {
    if (response['status'] === 400) {
      return Promise.reject(new BadRequestError(response['data']));
    }
    else if (response['status'] === 401) {
      return Promise.reject(new UnauthorizedError(response['data']));
    }
    else if (response['status'] === 404) {
      return Promise.reject(new NotfoundError(response['data']));
    }
    else if (response['status'] === 405) {
      return Promise.reject(new MethodNotAllowedError(response['data']));
    }
    else if (response['status'] === 417) {
      return Promise.reject(new ValidationError(response['data']));
    }
    else if (response['status'] === 503) {
      return Promise.reject(new UnavailableError(response['data']));
    }
    else {
      return Promise.reject(new NetworkError(response['data']));
    }
  }
};


const request = async (options) => {
  const instance = axios.create({
    ...defaultOptions,
    ...options,
    timeout: 24000,
  });

  instance.interceptors.request.use(requestLogger, errorLogger);
  instance.interceptors.response.use(responseLogger, errorLogger);

  const result = await instance(options);

  return result['data'];
};

export default request;
