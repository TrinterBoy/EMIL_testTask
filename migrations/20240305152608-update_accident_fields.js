'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.addColumn(
        'accidents',
        'createdAt',
        {
          type: Sequelize.DATE,
        },
        { transaction },
      ),
        await queryInterface.addColumn(
          'accidents',
          'updatedAt',
          {
            type: Sequelize.DATE,
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
      await queryInterface.removeColumn('users', 'createdAt', { transaction });
      await queryInterface.removeColumn('users', 'updatedAt', { transaction });
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },
};
