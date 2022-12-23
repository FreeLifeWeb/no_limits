/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Vacancies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Users',
          },
          key: 'id',
        },
      },
      title: {
        type: Sequelize.STRING,
      },
      company: {
        type: Sequelize.STRING,
      },
      city: {
        type: Sequelize.STRING,
      },
      sphereId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Spheres',
          },
          key: 'id',
        },
      },
      categoryId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Categories',
          },
          key: 'id',
        },
      },
      salary: {
        type: Sequelize.INTEGER,
      },
      time: {
        type: Sequelize.STRING,
      },
      format: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Vacancies');
  },
};
