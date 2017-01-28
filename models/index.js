const db = require('./db');

const List = require('./list');
const Task = require('./task');

Task.belongsTo(List, { as : 'listRelation' } );

module.exports = db;