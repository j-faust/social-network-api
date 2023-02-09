const { Schema, model, Types } = require('mongoose');

const userSchema = new Schema({
    username: { type: String,  required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true,  match: ''},
    thoughts: [{
        type: Schema.Types.ObjectId,
        ref: 'Thoughts',
    }],
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'Users'
    }],
}

)


const User = model('User', userSchema);

module.exports = User; 