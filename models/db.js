const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost/todoapp', { logging: false });

module.exports = db;
