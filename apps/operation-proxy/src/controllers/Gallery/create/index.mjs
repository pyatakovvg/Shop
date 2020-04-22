
import { sequelize, models } from '@sys.packages/db';


export default async (fields) => {
  const { Gallery } = models;

  if ( ! fields['externalId']) {
    return void 0;
  }

  if ( ! fields['productId']) {
    return void 0;
  }

  const galleryFields = {
    externalId: fields['externalId'],
    productId: fields['productId'],
  };

  const transaction = await sequelize.transaction();

  await Gallery.create(galleryFields, {
    transaction,
  });

  await transaction.commit();
};