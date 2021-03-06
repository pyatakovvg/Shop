
import { models } from '@sys.packages/db';


export default () => async (ctx) => {
  const where = {};
  const { Payment } = models;
  const { isUse } = ctx['query'];

  if (isUse) {
    where['isUse'] = isUse;
  }

  const result = await Payment.findAll({
    order: [
      ['order', 'asc']
    ],
    attributes: ['code', 'name', 'description', 'isUse'],
    where: { ...where },
  });

  const payments = result.map((item) => item.toJSON());

  ctx.body = {
    success: true,
    data: payments,
  };
};
