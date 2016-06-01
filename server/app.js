"use strict";

import http         from 'http';
import express      from 'express';
import path         from 'path';

const app = express();

const router = express.Router();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

router.get('/', (req, res, next) => {
    res.render('index', { title: 'Express' });
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
