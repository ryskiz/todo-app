const Sequelize = require('sequelize');
const db = require('./db');

let Task = db.define('task', {
    name : {
        type: Sequelize.STRING,
        allowNull: false
    },
    completed: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    }
});

module.exports = Task;