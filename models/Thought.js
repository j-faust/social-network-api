const { Schema, Types, model } = require('mongoose');

// reaction schema 
const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            max: 280,


        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (date) => {
                if(date) 
                    return date.toISOString().split('T')[0];
            },
        },
    },
    {
        toJSON: {
            getters: true,
        },
        id: false,
    }
);

// thought schema
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            min: 1,
            max: 280,

        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: value => value.toDateString(),
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema],
    }
);

// usings virtual for thought schema
thoughtSchema.virtual('reactCount')
    .get(function () {
        return this.reactions.length;
    });

// creating thought model using thought schema
const Thought = model('Thought', thoughtSchema);

// exporting the Thought model
module.exports = Thought;
