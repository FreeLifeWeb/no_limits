/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        name: 'Доведин Алекс',
        email: 'alexdovedin@type.script',
        password: 'sfsdfsdfdsfdsf',
        status: 'true',
        categoryId: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Чили Артур',
        email: 'chili@type.script',
        password: 'sfsdfsfdsf',
        status: 'false',
        categoryId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Данил Артемьев',
        email: 'artemyiev@type.script',
        password: 'sfsfdsf',
        status: 'false',
        categoryId: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Аксинья Федоровна',
        email: 'artem@type.script',
        password: 'sfsfd234sf',
        status: 'true',
        categoryId: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Илья Федорчук',
        email: 'ilyaiev@type.script',
        password: 'sfsfdsf',
        status: 'false',
        categoryId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Ирина Зинаидовна',
        email: 'ira2005@type.script',
        password: 'sfsfdsf',
        status: 'false',
        categoryId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Ева Захарова',
        email: ' zaxira8@type.script',
        password: 'sfsfdsf',
        status: 'false',
        categoryId: 7,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
