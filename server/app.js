"use strict";

import http         from 'http';
import express      from 'express';
import bodyParser   from 'body-parser';
import path         from 'path';
import mongoose     from 'mongoose';

import config from './config/dev';

import subjectRouter from './routes/subject';

import Subject from './models/subject';
import Question from './models/question';

mongoose.connect('mongodb://localhost/flashcards')

mongoose.connection.on('error', () => {
    console.log('MongoDB Connection Error. Maybe its not running?');
});

//let id = '57545587ff870bd61120772f';

//let q = Question.find().sort({'created': -1}).limit(1).exec(function (err, post) {
//    console.log(post[0]);
//    Subject.findByIdAndUpdate(
//            id,
//            {$push: {'questions': post[0]._id}},
//            {new: true},
//            function(err, sub) { console.log(sub) }
//    );
//});
//

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/subject', subjectRouter);

config.staticDirs.forEach((dir) => {
    console.log('Adding ', dir, ' to static');
    app.use(express.static(dir));
});


app.get('/', (req, res, next) => {
    Subject.find({}, (err, subjects) => {
        res.render('index', {
            title: 'Flashcards',
            subjects: subjects
        })
    });
});

app.use((req, res, next) => {
    const err = new Error('Not found...: ', req);
    err.status = 404;
    next(err);
});

export default app;
