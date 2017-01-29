'use strict';
const router = require('express').Router();
const db = require('../models/index.js');
const List = require('../models/list.js');
const Task = require('../models/task.js');

router.get('/', (req, res, next) => {
    next();
});
router.get('/:id', (req, res, next) => {
    let id = req.params.id;
    List.findById(id)
        .then((list) => {
            let theList = list;
            Task.findAll({
                where: {
                    listId: id
                }
            })
                .then((tasks) => {
                    res.render('list', {list: theList, tasks});
                })
                .catch((err) => {
                console.error(err)
                })
        })
        .catch((err) => {
            console.error(err)
        })
});
router.post('/:id', (req, res, next) => {
    console.log(req.body);
    Task.create({
        name: req.body.task,
        completed: false,
        listId: req.params.id
    })
        .then((createdTask) => {
            res.redirect(`/list/${req.params.id}`);
        })
        .catch((err) => {
        console.error(err)
        })
});
module.exports = router;