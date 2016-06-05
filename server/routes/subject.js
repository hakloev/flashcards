import express from 'express';

import Subject from '../models/subject';
import Question from '../models/question';

let router = express.Router();

router.get('/:id', (req, res, next) => {
    Subject.findById(req.params.id).populate('questions').exec((err, subject) => {
        if (err)
            next(err);
        res.render('subject', {
            title: subject.code + ': ' + subject.title,
            subject: subject
        })
    });
});

router.get('/:id/json', (req, res, next) => {
    Subject.findById(req.params.id).populate('questions').exec((err, subject) => {
        if (err) {
            res.json(err);
        } else if (subject == null) {
            res.json('No such object');
        } else {
            res.json(subject.questions);
        }
    })
});

router.get('/:id/add', (req, res, next) => {
    res.render('add_question', {
        title: 'Add question',
        subjectId: req.params.id
    })
});

router.post('/:id/add', (req, res, next) => {
    const question = {
        question: req.body.question,
        answer: req.body.answer
    };

    Subject.findOne({ _id: req.params.id }, (err, subject) => {
        if (err) {
            res.json(err);
        } else if (subject == null) {
            res.json('No such subject')
        } else {
            subject.questions.push(question);
            subject.save((err, data) => {
                if (err) {
                    res.json(err);
                } else {
                    res.json(data);
                }
            })
        }

    });
});

export default router;
