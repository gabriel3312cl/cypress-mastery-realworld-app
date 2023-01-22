"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const users = [
      {
        username: "John Doe",
        email: "john@example.com",
        password: `s3cret`,
        createdAt: "2023-01-22 10:34:24.404+01",
        updatedAt: "2023-01-22 10:34:24.404+01",
      },
      {
        username: "Katharina Bernig",
        email: "katharina@example.com",
        password: `s3cret`,
        createdAt: "2023-01-22 10:34:24.404+01",
        updatedAt: "2023-01-22 10:34:24.404+01",
      },
      {
        username: "Kevin Schulist",
        email: "kevin@example.com",
        password: `s3cret`,
        createdAt: "2023-01-22 10:34:24.404+01",
        updatedAt: "2023-01-22 10:34:24.404+01",
      },
      {
        username: "Cypress user",
        email: "cypressUser@example.com",
        password: `s3cret`,
        createdAt: "2023-01-22 10:34:24.404+01",
        updatedAt: "2023-01-22 10:34:24.404+01",
      },
    ]

    await queryInterface.bulkInsert("Users", users, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
