/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Resumes', [
      {
        name: 'Чили Артур',
        age: 20,
        email: 'chili@type.script',
        phoneNumber: '324234234',
        location: 'Санкт-Петербург',
        about: 'Опыт работы 3 года',
        photo: null,
        salary: 242500,
        sphereId: 5,
        userId: 2,
        categoryId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Данил Артемьев',
        age: 32,
        email: 'artemyiev@type.script',
        phoneNumber: '89945356446',
        location: 'Москва',
        about: 'Опыт работы 1 год',
        photo: null,
        salary: 35500,
        sphereId: 2,
        userId: 3,
        categoryId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Илья Федорчук',
        age: 19,
        email: 'ilyaiev@type.script',
        phoneNumber: '89095367888',
        location: 'Казань',
        about: 'Нет опыта.',
        photo: null,
        salary: 100000,
        sphereId: 6,
        userId: 5,
        categoryId: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Ирина Зинаидовна',
        email: 'ira2005@type.script',
        phoneNumber: '89453455421',
        location: 'Стамбул',
        about: 'Опыт работы 15 лет',
        photo: null,
        salary: 42500,
        sphereId: 1,
        userId: 6,
        categoryId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Resumes', null, {});
  },
};
