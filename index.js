"use strict";
var express = require('express'),
    app = express(), //define express module
    subject = require('./modules/md'), // import module   
    array = [], 
    port = process.env.PORT || 8080;

    app.use('/assets',express.static(`${__dirname}/public`));

for (let i = 1; i <= 10; i++) //Creating 10 subject
    array.push(subject({ subject: `subject number: ${i}`, votes: 0 }));


app.get('/', (req, res) => {
    res.send(`<!DOCTYPE html> <html> <head>
    <link href=assets/style.css rel=stylesheet></head>
     <body>
    <h1> votes </h1> <div >  ${log} </div>
    </body> </html>`);
});

//Listening 
app.listen(port);
console.log(`listening on port ${port}`);