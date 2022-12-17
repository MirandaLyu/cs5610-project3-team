const Schema = require('mongoose').Schema;

exports.UserSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Username is missing'],
        unique: [true, 'That username is taken']
    },
    password: {
        type: String,
        required: [true, 'password is required'],
        minLength: [8, 'Password should be at least 8 in length'],
    },
    description: String,
    },{
        timestamps: {
            createdAt: 'created',
            updatedAt: 'updated'
        }
    }
    ,{collection: 'user'}
);