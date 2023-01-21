"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const users = [
      {
        username: "John Doe",
        email: "john@example.com",
        password: `s3cret`,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "Katharina Bernig",
        email: "katharina@example.com",
        password: `s3cret`,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "Kevin Schulist",
        email: "kevin@example.com",
        password: `s3cret`,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "Cypress user",
        email: "cypressUser@example.com",
        password: `s3cret`,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]

    await queryInterface.bulkInsert("Users", users, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
