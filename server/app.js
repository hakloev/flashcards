"use strict";

import http         from 'http';
import express      from 'express';
import path         from 'path';

import config from './config/dev';

const app = express();

const router = express.Router();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

config.staticDirs.forEach((dir) => {
    console.log('Adding ', dir, ' to static');
    app.use(express.static(dir));
});

router.get('/', (req, res, next) => {
    res.render('index', { title: 'Flashcards' });
});

app.use('/', router);

app.use((req, res, next) => {
    const err = new Error('Not found...');
    err.status = 404;
    next(err);
});

router.get('/', (req, res) => {
    res.send('test');
});

export default app;
