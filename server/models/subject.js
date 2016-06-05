import mongoose from 'mongoose';

let subjectSchema = new mongoose.Schema({
    title: String,
    code: String,
    questions: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'Question'
    }]
});

export default mongoose.model('Subject', subjectSchema);
