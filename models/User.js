const { Schema, model, Types } = require('mongoose');

// creating  the user schema
const userSchema = new Schema(
    {
    username: { 
        type: String,  
        required: true, 
        unique: true, 
        trim: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true,  
        match: [/.+\@.+\..+/],
    },
    thoughts: [{
        type: Schema.Types.ObjectId,
        ref: 'Thought',
    }],
    friends: [
        {
        type: Schema.Types.ObjectId,
        ref: 'User'
     },
  ],
},
{
    toJSON: {
        virtuals: true,
    },
    id: false,
}
);

// using virtuals for the user schema
userSchema.virtual('countFriend').get(function () {
    return this.friends.length;
});

// creating the User model using the user schema
const User = model('User', userSchema);

// exporting User model
module.exports = User; 