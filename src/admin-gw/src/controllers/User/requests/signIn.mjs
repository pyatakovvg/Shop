'use strict';

import axios from '@sys.packages/request';
import { NotFoundError } from "@packages/errors";

const INVOICE_API_SRV = process.env['INVOICE_API_SRV'];


export default async (formData) => {

  const result = await axios({
    method: 'post',
    url: `${INVOICE_API_SRV}/connect`,
    data: formData,
  });

  if ( ! result['data']) {
    throw new NotFoundError({
      code: '404',
      message: 'Пользователь не найден'
    });
  }

  return result;
};