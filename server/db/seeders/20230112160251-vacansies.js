/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Vacancies', [
      {
        userId: 1,
        title: 'Переводчик',
        company: 'ЛингоДуо',
        city: 'Москва',
        sphereId: 12,
        categoryId: 2,
        salary: 45000,
        time: 'Частичная занятость',
        format: 'Удаленно',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        title: 'Vue.js разработчик',
        company: ' Covirally',
        city: 'Белград',
        sphereId: 1,
        categoryId: 3,
        salary: 150000,
        time: 'Полная занятость',
        format: 'Удаленно',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 4,
        title: 'Ведущий продуктовый дизайнер',
        company: 'Самокат',
        city: 'Москва',
        sphereId: 2,
        categoryId: 3,
        salary: 75000,
        time: 'Частичная занятость',
        format: 'Офис',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 4,
        title: 'Junior Developer Ruby on Rails',
        company: 'Edstein',
        city: 'Москва',
        sphereId: 2,
        categoryId: 6,
        salary: 55000,
        time: 'Полная занятость',
        format: 'Офис',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Vacancies', null, {});
  },
};
