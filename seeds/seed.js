const fs = require('fs');
const path = require('path');
const sequelize = require('../config/connection');
const { User, Post } = require('../models');

// Construct the path to your JSON files
const userDataPath = path.join(__dirname, 'userData.json');
const blogpostDataPath = path.join(__dirname, 'blogpostData.json');

// Read the content of the JSON files
const userDataJson = fs.readFileSync(userDataPath, 'utf-8');
const blogpostDataJson = fs.readFileSync(blogpostDataPath, 'utf-8');

// Parse the JSON data
const userData = JSON.parse(userDataJson);
const blogpostData = JSON.parse(blogpostDataJson);

// Your existing seedDatabase function
const seedDatabase = async () => {
  // Sync the models with the database, and force re-creation of tables
  await sequelize.sync({ force: true });

  // Bulk create users using userData with individualHooks
  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  // Loop through blogpostData and create posts with random user_id
  for (const post of blogpostData) {
    await Post.create({
      ...post,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  // Exit the process when seeding is complete
  process.exit(0);
};

// Execute the seedDatabase function
seedDatabase();

