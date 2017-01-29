'use strict';
const path = require('path');

//require in the packages
const express = require('express');
const bodyParser = require('body-parser');
const volleyball = require('volleyball');
const nunjucks = require('nunjucks');
const PORT = 3000;

//our modules
const db = require('./models/db');
const routes = require('./routes/index');

//app
const app = express();

//nunjucks configuration
app.set('view engine', 'html');
app.engine('html', nunjucks.render);
nunjucks.configure('views', {noCache: true});

//app.uses
app.use(volleyball);
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//routing for styles
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/css', express.static(__dirname + '/public/stylesheets/'));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/list', require('./routes/list'));

app.use('/', routes);

// error handling
app.use((req, res, next) => {
    let error = new Error("EVERYTHING BROKE YOU DUMMY");
    error.status = 404;
    next(error);
});
//error handling function
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    console.error(err);
    res.send(err);
});

//sync db if all is well
db.sync()
    .then(() => {
        app.listen(3001, function () {
            console.log(`Rocking out on port: localhost/${3000}`);
        })
    })
    .catch((err) => {
        console.log("SHIT! There was an error");
        console.error(err);
    });

