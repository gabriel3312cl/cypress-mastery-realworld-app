"use strict";

const { User } = require("../models");

module.exports = {
  async up(queryInterface, Sequelize) {
    const users = await User.findAll();

    const articles = [
      {
        slug: `lorem-ipsum-1`,
        title: `Lorem Ipsum 1`,
        description: `1 - Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
        body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nec ante lacinia magna ultricies cursus nec non lacus. Praesent blandit sodales semper. Mauris eget leo non erat molestie faucibus luctus sed ex. Duis sollicitudin tellus vitae aliquam cursus. Integer ultricies ultricies erat. Vivamus egestas ac augue nec mattis. Duis posuere bibendum ex vitae placerat. Duis in odio vestibulum, pellentesque odio vitae, egestas nibh.`,
        userId: users[0].id,
        createdAt: `2023-01-22 10:34:24.404+01`,
        updatedAt: `2023-01-22 10:34:24.404+01`,
      },
      {
        slug: `lorem-ipsum-2`,
        title: `Lorem Ipsum 2`,
        description: `2 - Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
        body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nec ante lacinia magna ultricies cursus nec non lacus. Praesent blandit sodales semper. Mauris eget leo non erat molestie faucibus luctus sed ex. Duis sollicitudin tellus vitae aliquam cursus. Integer ultricies ultricies erat. Vivamus egestas ac augue nec mattis. Duis posuere bibendum ex vitae placerat. Duis in odio vestibulum, pellentesque odio vitae, egestas nibh.`,
        userId: users[0].id,
        createdAt: `2023-01-21 10:34:24.404+01`,
        updatedAt: `2023-01-21 10:34:24.404+01`,
      },
      {
        slug: `lorem-ipsum-3`,
        title: `Lorem Ipsum 3`,
        description: `3 - Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
        body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nec ante lacinia magna ultricies cursus nec non lacus. Praesent blandit sodales semper. Mauris eget leo non erat molestie faucibus luctus sed ex. Duis sollicitudin tellus vitae aliquam cursus. Integer ultricies ultricies erat. Vivamus egestas ac augue nec mattis. Duis posuere bibendum ex vitae placerat. Duis in odio vestibulum, pellentesque odio vitae, egestas nibh.`,
        userId: users[1].id,
        createdAt: `2023-01-20 10:34:24.404+01`,
        updatedAt: `2023-01-20 10:34:24.404+01`,
      },
      {
        slug: `lorem-ipsum-4`,
        title: `Lorem Ipsum 4`,
        description: `4 - Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
        body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nec ante lacinia magna ultricies cursus nec non lacus. Praesent blandit sodales semper. Mauris eget leo non erat molestie faucibus luctus sed ex. Duis sollicitudin tellus vitae aliquam cursus. Integer ultricies ultricies erat. Vivamus egestas ac augue nec mattis. Duis posuere bibendum ex vitae placerat. Duis in odio vestibulum, pellentesque odio vitae, egestas nibh.`,
        userId: users[1].id,
        createdAt: `2023-01-19 10:34:24.404+01`,
        updatedAt: `2023-01-19 10:34:24.404+01`,
      },
      {
        slug: `lorem-ipsum-5`,
        title: `Lorem Ipsum 5`,
        description: `5 - Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
        body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nec ante lacinia magna ultricies cursus nec non lacus. Praesent blandit sodales semper. Mauris eget leo non erat molestie faucibus luctus sed ex. Duis sollicitudin tellus vitae aliquam cursus. Integer ultricies ultricies erat. Vivamus egestas ac augue nec mattis. Duis posuere bibendum ex vitae placerat. Duis in odio vestibulum, pellentesque odio vitae, egestas nibh.`,
        userId: users[1].id,
        createdAt: `2023-01-18 10:34:24.404+01`,
        updatedAt: `2023-01-18 10:34:24.404+01`,
      },
      {
        slug: `lorem-ipsum-6`,
        title: `Lorem Ipsum 6`,
        description: `6 - Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
        body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nec ante lacinia magna ultricies cursus nec non lacus. Praesent blandit sodales semper. Mauris eget leo non erat molestie faucibus luctus sed ex. Duis sollicitudin tellus vitae aliquam cursus. Integer ultricies ultricies erat. Vivamus egestas ac augue nec mattis. Duis posuere bibendum ex vitae placerat. Duis in odio vestibulum, pellentesque odio vitae, egestas nibh.`,
        userId: users[2].id,
        createdAt: `2023-01-10 10:34:24.404+01`,
        updatedAt: `2023-01-10 10:34:24.404+01`,
      },
      {
        slug: `lorem-ipsum-7`,
        title: `Lorem Ipsum 7`,
        description: `7 - Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
        body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nec ante lacinia magna ultricies cursus nec non lacus. Praesent blandit sodales semper. Mauris eget leo non erat molestie faucibus luctus sed ex. Duis sollicitudin tellus vitae aliquam cursus. Integer ultricies ultricies erat. Vivamus egestas ac augue nec mattis. Duis posuere bibendum ex vitae placerat. Duis in odio vestibulum, pellentesque odio vitae, egestas nibh.`,
        userId: users[2].id,
        createdAt: `2023-01-09 10:34:24.404+01`,
        updatedAt: `2023-01-09 10:34:24.404+01`,
      },
      {
        slug: `lorem-ipsum-8`,
        title: `Lorem Ipsum 8`,
        description: `8 - Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
        body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nec ante lacinia magna ultricies cursus nec non lacus. Praesent blandit sodales semper. Mauris eget leo non erat molestie faucibus luctus sed ex. Duis sollicitudin tellus vitae aliquam cursus. Integer ultricies ultricies erat. Vivamus egestas ac augue nec mattis. Duis posuere bibendum ex vitae placerat. Duis in odio vestibulum, pellentesque odio vitae, egestas nibh.`,
        userId: users[2].id,
        createdAt: `2022-12-19 10:34:24.404+01`,
        updatedAt: `2022-12-19 10:34:24.404+01`,
      },
      {
        slug: `lorem-ipsum-9`,
        title: `Lorem Ipsum 9`,
        description: `9 - Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
        body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nec ante lacinia magna ultricies cursus nec non lacus. Praesent blandit sodales semper. Mauris eget leo non erat molestie faucibus luctus sed ex. Duis sollicitudin tellus vitae aliquam cursus. Integer ultricies ultricies erat. Vivamus egestas ac augue nec mattis. Duis posuere bibendum ex vitae placerat. Duis in odio vestibulum, pellentesque odio vitae, egestas nibh.`,
        userId: users[2].id,
        createdAt: `2022-11-18 10:34:24.404+01`,
        updatedAt: `2022-11-18 10:34:24.404+01`,
      },
    ]

    await queryInterface.bulkInsert("Articles", articles, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Articles", null, {});
  },
};
