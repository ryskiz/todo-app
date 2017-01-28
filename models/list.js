const Sequelize = require('sequelize');
const db = require('./db');

let List = db.define('list', {
    listName: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = List;