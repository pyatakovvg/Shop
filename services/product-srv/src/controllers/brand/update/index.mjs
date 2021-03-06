
import { sendEvent } from '@sys.packages/rabbit';
import { models } from '@sys.packages/db';


export default () => async (ctx) => {
  const { Brand } = models;
  const { id } = ctx['params'];
  const data = ctx['request']['body'];

  await Brand.update(data, {
    where: { id },
  });

  const result = await Brand.findOne({
    attributes: ['id', 'value', 'description'],
    where: { id },
  });

  await sendEvent(process.env['EXCHANGE_BRAND_UPDATE'], JSON.stringify(result.toJSON()));

  ctx.body = {
    success: true,
    data: result.toJSON(),
  };
};
