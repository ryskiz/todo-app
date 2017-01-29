"use strict";

const router = require('express').Router();
const db = require('../models/index.js');
const List = require('../models/list.js');
const Task = require('../models/task.js');

router.get('/', (req, res, next) => {
    let findingLists = List.findAll({});
    let findingTasks = Task.findAll({});

    Promise.all([findingLists, findingTasks])
        .then((data) => {
            let lists = data[0];
            let tasks = data[1];
            res.render('index', {lists, tasks});
        })
        .catch((err) => {
            console.error((err))
        });
});

router.post('/', (req, res, next) => {
    console.log(req.body);
    List.create({
        listName: req.body.list
    }).then((createdList) => {
        console.log(createdList, "just created a list");
        res.redirect('/');
    })
    .catch(err => console.error(err));
});

module.exports = router;