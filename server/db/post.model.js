const mongoose = require('mongoose');

const PostSchema = require('./post.schema').PostSchema

const PostModel = mongoose.model("Post", PostSchema);

function createPost(post){
    return PostModel.create(post);
}

function getAllPost(){
    return PostModel.find().sort({created: -1}).exec();
}

// may need to updated the sorting mechamisum
function getAllPostForUser(user){
    return PostModel.find({
        username: user
    }).sort({updated: -1}).exec();
}


module.exports = {
    createPost,
    getAllPost,
    getAllPostForUser,
}