'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.addColumn(
        'users',
        'name',
        {
          type: Sequelize.STRING,
          allowNull: false,
        },
        { transaction },
      ),
        await queryInterface.addColumn(
          'users',
          'surName',
          {
            type: Sequelize.STRING,
            allowNull: false,
          },
          { transaction },
        ),
        await queryInterface.addColumn(
          'users',
          'phone',
          {
            type: Sequelize.STRING,
            allowNull: false,
          },
          { transaction },
        ),
        await queryInterface.addColumn(
          'users',
          'passportCode',
          {
            type: Sequelize.STRING,
            allowNull: false,
          },
          { transaction },
        ),
        await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async down(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.removeColumn('users', 'name',{ transaction });
      await queryInterface.removeColumn('users', 'surName',{ transaction });
      await queryInterface.removeColumn('users', 'phone',{ transaction });
      await queryInterface.removeColumn('users', 'passportCode',{ transaction });
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },
};
