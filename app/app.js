/**
 * Created by Remus on 31/05/2018
 */

const express = require('express');
const app = express();
const index = require('./routes/index');

const bodyParser = require('body-parser');





/* middlewares */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// the routes
app.use('/api/v1.0/',index);

// error handlers
app.use(function(req,res,next){
    res.status(404).json({msg: 'Error: API endpoint not found.'});
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});







// start the node_ctex server
const server = require('./server')(app);


module.exports = app;