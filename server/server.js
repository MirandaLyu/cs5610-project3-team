const express = require('express')
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const PostRoute = require('./api/post');
const UserRoute = require('./api/user');

const app = express()


app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/post', PostRoute);
app.use('/user', UserRoute);

// error handling middleware
// app.use((err, req, res, next) => {
//     console.log(err)
//     res.status(400).send("woow")
// })

const mongoEndpoint = 'mongodb+srv://proj3:project3@webdevneu.ozpcdcj.mongodb.net/twitterApp?retryWrites=true&w=majority'; 
mongoose.connect(mongoEndpoint, { useNewUrlParser: true });


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error connecting to MongoDB:'));

app.use(express.static(path.join(__dirname, 'build')));

app.get('*', function (req, res) {
    // res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


app.listen(8000, ()=>{
    console.log("Starting server for project 3 ...")
})