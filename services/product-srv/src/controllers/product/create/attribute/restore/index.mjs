
import { models, sequelize } from '@sys.packages/db';


export default async function updateProperties(uuid) {
  const { Characteristic, CharacteristicAttribute } = models;

  const transaction = await sequelize.transaction();

  const result = await Characteristic.findAll({
    where: { productUuid: uuid },
    transaction,
  });

  const characteristics = result.map((Characteristic) => Characteristic.toJSON());

  if ( !! characteristics.length) {
    for (let index in characteristics) {
      if (characteristics.hasOwnProperty(index)) {
        const characteristic = characteristics[index];

        await CharacteristicAttribute.destroy({
          where: { characteristicId: characteristic['id'] },
          transaction,
        });
      }
    }

    await Characteristic.destroy({
      where: { productUuid: uuid },
      transaction,
    });
  }

  await transaction.commit();
}
