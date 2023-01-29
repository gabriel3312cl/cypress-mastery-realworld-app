const express = require("express");
const util = require('node:util');
const exec = util.promisify(require('node:child_process').exec);
const router = express.Router();


//POST /testData/seed
router.post("/seed", async (req, res) => {
    await cleanDatabase();
    await seedDatabase();

    res.json({ status: "Database re-seeded" });
});

const cleanDatabase = async () => {
    try {
        const cleanDatabase = await exec('npx sequelize-cli db:seed:undo:all');
        console.log(cleanDatabase);
    } catch (error) {
        console.error(`Clean database script failed with ${error}`);
    }
}

const seedDatabase = async () => {
    try {
        const seedDatabase = await exec('npx sequelize-cli db:seed:all');
        console.log(seedDatabase);
    } catch (error) {
        console.error(`Seed database script failed with ${error}`);
    }
}

module.exports = router;
