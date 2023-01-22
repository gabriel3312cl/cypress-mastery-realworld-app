"use strict";

const { Article } = require("../models");
const { User } = require("../models");

module.exports = {
  async up(queryInterface, Sequelize) {
    const articles = await Article.findAll();
    const users = await User.findAll();

    const comments = [
      {
        body: "Very nice post",
        articleId: articles[0].id,
        userId: users[1].id,
        createdAt: `2023-01-20 10:34:24.404+01`,
        updatedAt: `2023-01-20 10:34:24.404+01`,
      },
      {
        body: "I love it. Could you write more about credit rates crisis?",
        articleId: articles[0].id,
        userId: users[2].id,
        createdAt: `2023-01-21 10:34:24.404+01`,
        updatedAt: `2023-01-21 10:34:24.404+01`,
      },
    ]

    await queryInterface.bulkInsert("Comments", comments, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Comments", null, {});
  },
};