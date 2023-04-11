var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql2');
var path = require('path');
var connection = mysql.createConnection({
                host: '34.28.95.92',
                user: 'root',
                password: 'test1234',
                database: 'flightsystems'
});

//connection.connect;

connection.connect(function(err) {
    if (err) {
      console.error('Error connecting: ' + err.stack);
      return;
    }
    console.log("Works");
    console.log('Connected as thread id: ' + connection.threadId);
  });

  var sql = `SELECT * FROM airline`;
    connection.query(sql, function(err, result, fields) {
      if (err) {
        res.send(err)
        return;
      }
      console.log(result);
    });
var app = express();

// set up ejs view engine 
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');
 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '../public'));

/* GET home page, respond by rendering index.ejs */
// app.get('/', function(req, res) {
//     var sql = `SELECT * FROM airline`;
// });

// app.get('/', function(req, res) {
//       res.send({'message': 'works'});
// })
 
// this code is executed when a user clicks the form submit button
app.post('/', function(req, res) {
  var sql = `SELECT * FROM airline`;
console.log(sql);
  connection.query(sql, function(err, result, fields) {
    if (err) {
      res.send(err)
      return;
    }
    console.log(result);
  });
});



app.listen(80, function () {
    console.log('Node app is running on port 80');
});

