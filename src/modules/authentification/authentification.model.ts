import { Schema, model } from 'mongoose';

export const AuthetificationSchema = new Schema({
    authentificationUser:{
        type: String,
        required: true
    },
    authentificationDate:{
        type: Date,
        default: new Date()
    }
});

export default model('Authentification', AuthetificationSchema);