"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const tags = [
      {
        name: "Finances"
      },
      {
        name: "Technology"
      },
      {
        name: "Testing"
      },
      {
        name: "Cypress"
      },
      {
        name: "API"
      },
    ]

    await queryInterface.bulkInsert("Tags", tags, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Tags", null, {});
  },
};
