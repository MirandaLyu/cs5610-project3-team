const Schema = require('mongoose').Schema

exports.PostSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    }
    },{
        timestamps: {
            createdAt: 'created',
            updatedAt: 'updated'
        }
    }
    ,{collection: 'post'}
);