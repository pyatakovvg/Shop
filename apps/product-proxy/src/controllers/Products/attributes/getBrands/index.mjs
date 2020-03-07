
import { models, Sequelize, sequelize } from '@sys.packages/db';


export default () => async (ctx) => {
  try {
    let where = {};

    const { Op } = Sequelize;
    const { Product } = models;
    const {
      status = null, categoryId = null, amountFrom = null, typeId = null,
      amountTo = null, colorId = null, formId = null, materialId = null,
    } = ctx['request']['query'];

    if (status) {
      where['status'] = status;
    }

    if (typeId) {
      where['typeId'] = typeId;
    }

    if (categoryId) {
      where['categoryId'] = categoryId;
    }

    if (colorId) {
      where['colorId'] = colorId;
    }

    if (formId) {
      where['formId'] = formId;
    }

    if (materialId) {
      where['materialId'] = materialId;
    }

    if (amountFrom && ! amountTo) {
      where['amount'] = {
        [Op.gte]: amountFrom
      };
    } else if (amountTo && ! amountFrom) {
      where['amount'] = {
        [Op.lte]: amountTo
      };
    } else if (amountFrom && amountTo) {
      where['amount'] = {
        [Op.between]: [amountFrom, amountTo]
      };
    }

    const result = await Product.findAll({
      raw: true,
      group: ['Product.brand'],
      attributes: [['brand', 'value'], [sequelize.fn('COUNT', sequelize.col('brand')), 'count']],
      where: { ...where },
    });
    
    ctx.body = {
      success: true,
      data: result,
    };
  }
  catch(e) {

    ctx.status = 500;
    ctx.body = {
      success: false,
      error: { code: '500', message: e.message }
    };
  }
};
