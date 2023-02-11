const { Schema, Types } = require('mongoose');

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
            get: value => value.toDateString(),
        },
    },
    {
        toJSON: {
            getters: true,
        },
        id: false,
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
