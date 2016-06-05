import mongoose from 'mongoose';

let questionSchema = new mongoose.Schema({
    question: String,
    answer: String,
    created: { type: Date, default: Date.now },
    updated: Date
});

export default mongoose.model('Question', questionSchema);
