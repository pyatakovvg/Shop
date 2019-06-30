'use strict';

import axios from 'axios';

const PRODUCT_API_SRV = process.env['PRODUCT_API_SRV'];


export default async (id, formData) => {

  const { data } = await axios({
    method: 'put',
    url: `${PRODUCT_API_SRV}/stock/products/${id}`,
    data: formData,
  });

  return data;
};
