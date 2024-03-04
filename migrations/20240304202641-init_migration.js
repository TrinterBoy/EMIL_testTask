'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable(
        'users',
        {
          id: {
            type: Sequelize.UUID,
            unique: true,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4,
          },
          email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
          },
          password: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          createdAt: {
            type: Sequelize.DATE,
          },
          updatedAt: {
            type: Sequelize.DATE,
          },
        },
        { transaction },
      ),
        await queryInterface.createTable(
          'contracts',
          {
            id: {
              type: Sequelize.UUID,
              unique: true,
              primaryKey: true,
              defaultValue: Sequelize.UUIDV4,
            },
            userId: {
              type: Sequelize.UUID,
              allowNull: false,
              references: {
                model: 'users',
                key: 'id',
              },
              onDelete: 'CASCADE',
            },
            description: {
              type: Sequelize.STRING,
              allowNull: false,
            },
            notes: {
              type: Sequelize.STRING,
              allowNull: true,
            },
            compensation: {
              type: Sequelize.INTEGER,
              allowNull: true,
            },
            expireDate: {
              type: Sequelize.DATE,
              allowNull: false,
            },
            createdAt: {
              type: Sequelize.DATE,
            },
            updatedAt: {
              type: Sequelize.DATE,
            },
          },
          { transaction },
        ),
        await queryInterface.createTable(
          'accidents',
          {
            id: {
              type: Sequelize.UUID,
              unique: true,
              primaryKey: true,
              defaultValue: Sequelize.UUIDV4,
            },
            description: {
              type: Sequelize.STRING,
              allowNull: false,
            },
            notes: {
              type: Sequelize.STRING,
              allowNull: true,
            },
            userId: {
              type: Sequelize.UUID,
              allowNull: true,
              references: {
                model: 'users',
                key: 'id',
              },
              onDelete: 'SET NULL',
            },
            contractId: {
              type: Sequelize.UUID,
              allowNull: true,
              references: {
                model: 'contracts',
                key: 'id',
              },
              onDelete: 'SET NULL',
            },
            status: {
              type: Sequelize.ENUM([
                'under_consideration',
                'declined',
                'approved',
              ]),
              allowNull: false,
              defaultValue: 'under_consideration',
            },
            victims: {
              type: Sequelize.JSONB,
              allowNull: false,
            },
          },
          { transaction },
        );
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
      await queryInterface.dropTable('users',{transaction})
      await queryInterface.dropTable('contracts',{transaction})
      await queryInterface.dropTable('accidents',{transaction})
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },
};
