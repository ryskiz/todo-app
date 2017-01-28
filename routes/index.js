"use strict";

const router = require('express').Router();
const db = require('../models/index.js');
const List = require('../models/list.js');
const Task = require('../models/task.js');

router.get('/', (req, res, next) => {
    res.render('index', { lists, tasks });
});

module.exports(router);