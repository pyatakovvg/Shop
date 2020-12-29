
import {sendEvent} from "@sys.packages/rabbit";
import { sequelize, models } from '@sys.packages/db';


export default () => async (ctx) => {
  const { Type } = models;
  const data = ctx['request']['body'];

  const transaction = await sequelize.transaction();

  const result = await Type.create(data, { transaction });

  await sendEvent(process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_TYPE_CREATED'], JSON.stringify(result.toJSON()));

  await transaction.commit();

  ctx.body = {
    success: true,
    data: result.toJSON(),
  };
};