import { Schema, model } from 'mongoose';

export const UserSchema = new Schema({
    userName:{
        type: String,
        lowercase: true,
        trim: true
    },
    userPassword:{
        type: String,
        required: [true, 'Clave requerida.']
    },
    userEmail:{
        type: String,
        lowercase: true,
        trim: true
    }
});

export default model('User', UserSchema);