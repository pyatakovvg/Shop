
module.exports = {
  async up(queryInterface, DataType) {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.createTable('CharacteristicAttributes', {
        id: {
          type: DataType.INTEGER,
          primaryKey: true,
          unique: true,
          autoIncrement: true,
        },
        characteristicId: {
          type: DataType.INTEGER,
          allowNull: false,
        },
        attributeId: {
          type: DataType.INTEGER,
          allowNull: false,
        },
        value: {
          type: DataType.STRING(32),
          allowNull: true
        },
        order: {
          type: DataType.INTEGER,
          defaultValue: 1,
          allowNull: false,
        },
        use: {
          type: DataType.BOOLEAN,
          defaultValue: false,
          allowNull: false,
        }
      }, {
        transaction
      });

      await transaction.commit();
    }
    catch (err) {

      await transaction.rollback();

      throw err;
    }
  },
  async down(queryInterface) {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await transaction.commit();
    }
    catch (err) {

      await transaction.rollback();

      throw err;
    }
  },
};
