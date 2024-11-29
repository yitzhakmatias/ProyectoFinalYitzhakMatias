// seeders/XXXXXXXXXXXXXX-seed-tasks.js
'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('Tasks', [
      {
        name: 'Task 1 for Admin',
        userId: 1, // Assuming admin user has ID 1
        done: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Task 2 for User1',
        userId: 2, // Assuming user1 has ID 2
        done: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Tasks', null, {});
  },
};
