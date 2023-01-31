const { defineConfig } = require("cypress");
const axios = require("./frontend/node_modules/axios");

module.exports = defineConfig({
  env: {
    apiUrl: "http://localhost:3001/api"
  },
  e2e: {
    baseUrl: "http://localhost:3000",
    supportFile: "cypress/support/e2e.ts",
    viewportHeight: 1080,
    viewportWidth: 1920,

    setupNodeEvents(on, config) {
      on("task", {
        async "db:seed"() {
          const { data } = await axios.post(`${config.env.apiUrl}/testData/seed`);
          return data;
        },

      });
    },
  },
});
