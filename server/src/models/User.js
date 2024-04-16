import { Schema, model } from 'mongoose';
const userSchema = new Schema({
    name: {
        type: String
    },
    username: {
        type: String,
        min:6,
        max:32,
        required: true,
        unique: true
    },
    password: {
        type: String,
        min:6,
        max:32,
        required: true,
},
email: {
    type: String,
    min:6,
    max:32,
    required: true,
    unique: true
},
date: {
    type: Date,
    default: Date.now}
});

export default model('User', userSchema);