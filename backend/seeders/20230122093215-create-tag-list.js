"use strict";

const { Tag } = require("../models");
const { Article } = require("../models");

module.exports = {
  async up(queryInterface, Sequelize) {
    const tags = await Tag.findAll();
    const articles = await Article.findAll();

    const tagList = [
      {
        articleId: articles[0].id,
        tagName: tags[0].name,
      },
      {
        articleId: articles[1].id,
        tagName: tags[0].name,
      },
      {
        articleId: articles[1].id,
        tagName: tags[1].name,
      },
      {
        articleId: articles[2].id,
        tagName: tags[2].name,
      },
      {
        articleId: articles[2].id,
        tagName: tags[3].name,
      },
      {
        articleId: articles[2].id,
        tagName: tags[4].name,
      },
      {
        articleId: articles[5].id,
        tagName: tags[0].name,
      },
      {
        articleId: articles[6].id,
        tagName: tags[0].name,
      },
    ]

    await queryInterface.bulkInsert("TagList", tagList, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("TagList", null, {});
  },
};
