
module.exports = {
  async up(queryInterface, DataType) {
    const transaction = await queryInterface.sequelize.transaction();

    try {

      await queryInterface.createTable('Statuses', {
        id: {
          type: DataType.INTEGER,
          allowNull: false,
          autoIncrement: true,
        },
        code: {
          type: DataType.INTEGER,
          primaryKey: true,
          allowNull: false,
        },
        name: {
          type: DataType.STRING,
          allowNull: false,
        },
        description: {
          type: DataType.STRING(1024),
          defaultValue: ''
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
