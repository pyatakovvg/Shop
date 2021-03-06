
import { models } from '@sys.packages/db';


export default () => async (ctx) => {
  const where = {};
  const { Delivery } = models;
  const { isUse } = ctx['query'];

  if (isUse) {
    where['isUse'] = isUse;
  }

  const result = await Delivery.findAll({
    order: [
      ['order', 'asc']
    ],
    attributes: ['code', 'name', 'description', 'isUse'],
    where: { ...where },
  });

  const deliveries = result.map((item) => item.toJSON());

  ctx.body = {
    success: true,
    data: deliveries,
  };
};
