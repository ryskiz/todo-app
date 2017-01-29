'use strict';
const Promise = require('bluebird');
const db = require('./models/index');
const List = require('./models/list');
const Task = require('./models/task');

let data = {
    tasks: [{name: 'go to urban', completed: false, list: { listName: 'Shopping' }}
    ]
};

db.sync({force: true})
    .then(() => {
        const creatingTasks = Promise.map(data.tasks, (task) => {
            return Task.create(task, { include: [List] });
        });
        return Promise.all([creatingTasks]);
    })
    .then(() => {
        console.log("finished inserting data");
    })
    .catch(err => console.error(err))
    .finally(() => {
        db.close();
        return null;
    });



