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
    //console.log("Works");
    console.log('Connected as thread id: ' + connection.threadId);
  });

//   var sql = `SELECT * FROM airline`;
//     connection.query(sql, function(err, result, fields) {
//       if (err) {
//         res.send(err)
//         return;
//       }
//       console.log(result);
//     });
var app = express();

// set up ejs view engine
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '../public'));

// we need app.get()

app.get('/getUser', async function(req, res)  {
  var query = `SELECT * FROM user`;
  connection.query(query, function(err, result, fields) {
    if (err) {
      console.log("error in flight");
      return;
    }
    else {
    res.json(result)
    return;
    }
  });
});

app.get('/getFlight', async function(req, res)  {
  var query = `SELECT * FROM flight`;
  connection.query(query, function(err, result, fields) {
    if (err) {
      console.log("error in flight");
      return;
    }
    else {
    res.json(result)
    return;
    }
  });
});


app.post('/addUser', function(req, res) {
  //var password = Math.floor(Math.random()*90000) + 10000;
  res.header("Access-Control-Allow-Origin", "*");
  const user = req.body.data.user;
  const password = req.body.data.password;
  var query = `INSERT INTO user(LoginID, Password) VALUES('${user}','${password}')`;
  connection.query(query, function(err, result, fields) {
    if (err) {
      console.log(err);
      res.status(500).send("Error")
      return;
    }
    else {
      console.log("Works");
      res.send("User inserted successfully!"); // Example response to client
      return;
    }
  });
});

// getQueryTab1 = function (userLogin) {
//     var password = Math.floor(Math.random()*90000) + 10000;
//     var query = `Insert into user(LoginID, Password) values(${userLogin},${password})`
//     connection.query(sql, function(err, result, fields) {
//         if (err) {
//           res.send(err)
//           return;
//         }
//         console
//       });
// };
app.delete('/deleteUser', function(req, res) {
  const {user} = req.body;
  var query = `DELETE FROM user WHERE LoginID = '${user}'`;
  connection.query(query, function(err, result, fields) {
    if (err) {
      console.log(err);
      res.status(500).send("Error")
      return;
    }
    else {
      console.log("Works");
      res.send("User inserted successfully!"); // Example response to client
      return;
    }
  });
});
// getQueryTab2 = function (userName) {
//     var query = `DELETE FROM user WHERE LoginID = (${userName})`
//     connection.query(sql, function(err, result, fields) {
//         if (err) {
//           res.send(err)
//           return;
//         }
//         //What we return from query
//       });
// };

app.put('/updateFlight/', function(req, res) {
  console.log(req.body.data.flightID)
  const airlineID = req.body.data.airlineID;
  const flightID = req.body.data.flightID;
  console.log(airlineID)
  var query = `UPDATE flight SET AIRLINE_ID = '${airlineID}'WHERE Flight_ID = '${flightID}'`
  connection.query(query, function(err, result, fields) {
    if (err) {
      console.log(err);
    }
    else {
      console.log("Works");
      res.send("User inserted successfully!"); // Example response to client
    }
  });
});

app.post('/searchAirport', function(req, res) {
  const airportID = req.body.data.airportID
  console.log(airportID)
  var query = `SELECT * FROM flight WHERE ORIGIN_AIRPORT = '${airportID}'`
  connection.query(query, function(err, result, fields) {
    if (err) {
      console.log("error in flight");
      return;
    }
    else {
    res.json(result)
    return;
    }
  });
});

app.post('/searchNAirport', function(req, res) {
  const count = req.body.data.count
  console.log(count)
  var query = `SELECT count(IATA_Code) as Number_of_Airports, City, State FROM location natural join airport group by City_ID having Number_of_Airports = '${count}'`;
 connection.query(query, function(err, result, fields) {
    if (err) {
      console.log("error in flight");
      return;
    }
    else {
    res.json(result)
    return;
    }
  });
});

app.post('/flightDepartArrive', function(req, res) {
  const airportID = req.body.data.airportID
  console.log(airportID)
  var query = `(SELECT Destination_Airport, Air_Time FROM flight WHERE Origin_Airport = '${airportID}') UNION (SELECT Origin_Airport, Air_Time FROM flight WHERE Destination_Airport =  '${airportID}')`
  connection.query(query, function(err, result, fields) {
    if (err) {
      console.log("error in flight");
      return;
    }
    else {
    res.json(result)
    return;
    }
  });
});

app.get('/storedProcedure', function(req, res) { //new function
  var query = `Select * from NewTable1`
  connection.query(query, function(err, result, fields) {
    if (err) {
      console.log("error in flight");
      return;
    }
    else {
    res.json(result)
    return;
    }
  });
});
app.post('/flightTriggerResponse', function(req, res) { //new function
  //Add sql insert based on query fields: flightID, airlineID, originAirport, destination, year, month,
  //day, scheduledDeparture, departureTime, scheduledArrivalTime, arrivalTime

//after, return results from new table.

  var query = `Select * from Newtable;`
  connection.query(query, function(err, result, fields) {
    if (err) {
      console.log("error in flight");
      return;
    }
    else {
    res.json(result)
    return;
    }
  });
});


// getQueryTab3 = function (airLineID, FlightID) {
//     var query = 'UPDATE flight SET AIRLINE_ID =  (${airLineID}) WHERE Flight_ID = (${FlightID})'

//     connection.query(sql, function(err, result, fields) {
//         if (err) {
//           res.send(err)
//           return;
//         }
//         //What we return from query
//       });
// };
/* GET home page, respond by rendering index.ejs */
 app.get('/', function(req, res) {
     var sql = `SELECT * FROM airline`;
});

// app.get('/', function(req, res) {
//       res.send({'message': 'works'});
// })
 
// this code is executed when a user clicks the form submit button
// app.post('/', function(req, res) {
//   var sql = `SELECT * FROM airline`;
// console.log(sql);
//   connection.query(sql, function(err, result, fields) {
//     if (err) {
//       res.send(err)
//       return;
//     }
//     console.log(result);
//   });
// });
// bypass no CORS instruction
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.listen(8080, function (err) {
  if(err) console.log(err);
    console.log('Node app is running on port 8080');
});

