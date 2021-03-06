
import request from "@sys.packages/request";

import productBuilder from "./productBuilder.mjs";


export default () => async (ctx) => {
  const { uuid } = ctx['request']['body'];

  const { data: products } = await request({
    url: process.env['PRODUCT_API_SRV'] + '/products',
    method: 'get',
    params: {
      vendor: uuid.map(item => item[2]['vendor']),
    }
  });

  const { data: amount } = await request({
    url: process.env['OPERATION_API_SRV'] + '/amounts',
    method: 'post',
    data: {
      uuid,
    }
  });

  ctx.body = {
    success: true,
    data: {
      products: products.map((item) => productBuilder(item)),
      amount,
    }
  };
};
