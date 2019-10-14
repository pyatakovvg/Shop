'use strict';

import { sequelize, models } from '@sys.packages/db';

import { sendEvent } from "@sys.packages/rabbit";


export default () => async (ctx) => {

  const { productId } = ctx['params'];

  await sequelize.transaction(async (transaction) => {

    await models['Stock'].destroy({
      where: { id: productId },
      transaction,
    });
  });

  sendEvent(process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_STOCK_PRODUCT_DELETED'], productId);

  ctx.body = {
    success: true,
    data: Number(productId),
  };
};