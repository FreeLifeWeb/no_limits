/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Spheres', [
      {
        title: 'Информационные технологии',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Общественное питание',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Строительство',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Медицинские и оздоровительные услуги',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Консалтинговые услуги: экономика, маркетинг',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Инжиниринг и научный консалтинг',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Сфера развлечений',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Аграрный бизнес',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Индустрия красоты',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Бытовые услуги',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Логистика',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Прочее',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Spheres', null, {});
  },
};
