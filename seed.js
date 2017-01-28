'use strict';
const Promise = require('bluebird');
const db = require('./models/');
const List = require('./models/list');
const Task = require('./models/task');

let data = {
    lists: [{listName: 'Shopping'}] ,
    tasks: [{name: 'go to urban', completed: false},
        {name: 'go study maths', completed: false},
        {name: 'go to hangout with joe', completed: false},
        {name: 'go do something else', completed: true}
    ]
};

db.sync({force: true})
    .then(() => {
        console.log("Dropped old data, now inserting data");
        const creatingLists = Promise.map(data.lists, (list) => {
            return List.create(list)
        });
        const creatingTasks = Promise.map(data.tasks, (task) => {
            return Task.create(task);
        });
        return Promise.all([creatingLists, creatingTasks]);
    })
    .then(() => {
        console.log("finished inserting data");
    })
    .catch(err => console.error(err))
    .finally(() => {
        db.close();
        return null;
    });



