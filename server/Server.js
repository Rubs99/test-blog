require('./config/config');


const express = require('express');
const { mongoose } = require('./DataBase');
const path = require('path');


const app = express();



//middelwares
app.use(express.json());



//routes

app.use('/api/user',require('./routes/user.routes'));
app.use('/api/login', require('./routes/authentication.routes'));
app.use('/api/post', require('./routes/post.routes'));

app.use( require('./routes/authentication.routes'));


//static files
app.use(express.static(path.join(__dirname, 'libs/public')));





//starting server

app.listen(process.env.PORT, () => {
    console.log('server on port',process.env.PORT );
});
