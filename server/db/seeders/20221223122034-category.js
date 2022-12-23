/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Categories', [
      {
        title: 'Нарушение слуха',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Нарушение зрения',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Нарушение речи',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Нарушение интелекта',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Нарушение психического развития',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Нарушение опрно-двигательного аппарата',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Нарушение эмоционально-волевой сферы',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Множественные нарушения',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories', null, {});
  },
};
