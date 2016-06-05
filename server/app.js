"use strict";

import http         from 'http';
import express      from 'express';
import path         from 'path';
import mongoose     from 'mongoose';

import config from './config/dev';

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

const router = express.Router();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

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

app.get('/subject/:id', (req, res, next) => {
    Subject.findById(req.params.id).populate('questions').exec((err, subject) => {
        console.log(subject);
        res.render('subject', {
            title: subject.code + ': ' + subject.title,
            subject: subject
        })
    });
});

app.get('/subject/:id/json', (req, res, next) => {
    Subject.findById(req.params.id).populate('questions').exec((err, subject) => {
        res.json(subject.questions);
    })
});

//app.use('/', router);

app.use((req, res, next) => {
    const err = new Error('Not found...: ', req);
    err.status = 404;
    next(err);
});

router.get('/', (req, res) => {
    res.send('test');
});

export default app;
