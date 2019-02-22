var express = require('express');
var app = express();
const path = require('path');
const router = express.Router();
var http = require('http');
var twilio = require('twilio');
// const MongoClient = require('mongodb').MongoClient;
// const assert = require('assert');
const bodyParser = require('body-parser');

app.use(bodyParser.json());        
app.use(bodyParser.urlencoded({ extended: false }));

// const url = 'mongodb://localhost:27017';
// const dbName = 'mydb';

var accountSid = 'AC74a7dd627e0c62e42a9f905ed1b00d40'; // Your Account SID from www.twilio.com/console
var authToken = '590820d20ce1d8c68441f9d7d4e6f0c9';   // Your Auth Token from www.twilio.com/console

var port = process.env.PORT || 3000
var hostname = '127.0.0.1';
var number;
// MongoClient.connect(url, function(err, client) {
//     assert.equal(null, err);
//     console.log("Connected successfully to server");
//     const db = client.db(dbName);
//     client.close();
// });

router.get('/',function(req,res){
    res.sendFile(path.join(__dirname+'/index.html'));
    //__dirname : It will resolve to your project folder.
    // sendMessage(accountSid, authToken, 'Hello from Node');
});

router.get('/myForm', function(req, res){
    number = req.query.valetNumber;
    console.log(number);
    res.sendFile(path.join(__dirname+'/index.html'));
});


app.use(express.static(__dirname + '/View'));
//Store all HTML files in view folder.
app.use(express.static(__dirname + '/Script'));
//Store all JS and CSS in Scripts folder.
app.use(express.static(__dirname + '/assets'));

app.use('/', router);
app.listen(port);

// sendMessage(accountSid, authToken, 'Hello from Node');

var sendMessage =  (accountSid, authToken, msgText) => {
    var client = new twilio(accountSid, authToken);
    client.messages.create({
        body: msgText,
        to: '+14696827487',  // Text this number
        from: '+16822049082' // From a valid Twilio number
    })
    .then((message) => console.log(message.sid)).done();
};