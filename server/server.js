const express = require('express');
//const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('config');
const authMiddleware = require('./middlewares/auth.middleware');

const app = express();
app.use(cors());
app.use(express.json()); // body parser for JSON middleware

const db = (process.env.NODE_ENV === 'production' ? config.get('mongoURI_external') : config.get('mongoURI'));

//connect ot mongoDB
mongoose.connect(
    db,
    {
        useNewUrlParser: true,
        useCreateIndex: true
    }
    )
    .then(() => console.log('mongoDB connected'))
    .catch(err => console.log(err));

//use routes
app.use('/auth', require('./routes/auth.route')); // POST /login  POST /register
app.use('/api', authMiddleware.checkToken, require('./routes/api.route'));


//serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    //set static folder
    app.use(express.static('client/build'));
    
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}

const port = process.env.PORT || 5000; //first component for HEROCU


app.listen(port, () => console.log(`server started on port ${port}`));