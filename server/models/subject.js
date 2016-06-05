import mongoose from 'mongoose';

import Question from './question';

let subjectSchema = new mongoose.Schema({
    title: String,
    code: String,
    questions: [Question.schema]
});

export default mongoose.model('Subject', subjectSchema);
