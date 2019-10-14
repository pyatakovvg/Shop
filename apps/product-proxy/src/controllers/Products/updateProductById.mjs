'use strict';

import { sendEvent } from '@sys.packages/rabbit';
import { getFiles } from "@sys.packages/sys.utils";
import { sequelize, models } from '@sys.packages/db';


const saveFiles = (files, { productId }, { transaction }) => {

  const { Gallery } = models;

  return new Promise((resolve) => {

    if ( ! Object.keys(files).length) {
      resolve();
    }

    Object.keys(files)
      .map(async (key, index) => {

        const fileBuffer = files[key]['buffer'];

        await Gallery.create({ productId, file: fileBuffer }, { transaction });

        if (Object.keys(files).length === index + 1) {
          resolve();
        }
      });
  });
};

export default () => async (ctx) => {

  const { productId } = ctx.params;
  const { files, fields } = await getFiles(ctx.req);
  const { Attribute, Product, Units, Gallery } = models;

  const product = await sequelize.transaction(async (transaction) => {

    await Attribute.destroy({ where: { productId }}, { transaction });

    const attributes = [...JSON.parse(fields['attributes'])]
      .map(item => {
        item['productId'] = productId;
        return item;
      });

    await Attribute.bulkCreate(attributes, { transaction });

    await Product.update(fields, { where: { id: productId }, transaction });

    await saveFiles(files, { productId }, { transaction });

    return Product.findOne({
      where: { id: productId },
      attributes: ['id', 'name', 'brand', 'description', 'status'],
      include: [
        {
          model: Attribute,
          required: false,
          as: 'attributes',
          attributes: ['name', 'value'],
          include: [
            {
              model: Units,
              required: false,
              as: 'unit',
              attributes: ['id', 'value']
            }
          ]
        },
        {
          model: Gallery,
          required: false,
          as: 'gallery',
          attributes: ['id'],
        },
      ],
      transaction });
  });

  const result = product.toJSON();

  sendEvent(process.env['RABBIT_PRODUCT_PROXY_EXCHANGE_PRODUCT_UPDATED'], JSON.stringify(result));

  ctx.body = {
    success: true,
    data: result,
  };
};