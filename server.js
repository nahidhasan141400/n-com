require('dotenv').config();
const express = require('express');
const app = express();
const ejs = require('ejs');
const path = require('path');
const PORT = process.env.PORT || 3300;
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const Emitter = require('events');

mongoose.connect(process.env.MONGO_CONNECTION_URL,{ useUnifiedTopology: true ,useNewUrlParser: true }).then((result) => {
    console.log('db connected');
}).catch((err) => {
    console.log(err)
});

// Assets
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cookieParser());

// eventemitar init 
const eventEmitter = new Emitter();
app.set('eventEmitter', eventEmitter);

// set Template engine
app.set('views', path.join(__dirname, '/resources/views'))
app.set('view engine', 'ejs')


// route
const route = require('./routes/allroutes');
app.use('/',route);
app.get('*',(r,s)=>{
    s.redirect('/menu')
})
const server = app.listen(PORT , () => {
            console.log(`Listening on port ${PORT}`)
        })


// socket init 
const io = require('socket.io')(server);

io.on('connection',(socket)=>{
    socket.on('join',(idjj)=>{
        socket.join(idjj);        
    });
});

eventEmitter.on('orderPlaced', (data) => {
    io.to('admin').emit('orderPlaced', data);
});