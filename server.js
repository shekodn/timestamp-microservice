// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


app.get("/api/timestamp/:date_string?", function (req, res) {
  const date_string = req.params.date_string;

  // If the date string is empty it should be equivalent to trigger new Date(),
  // i.e. the service uses the current timestamp.
  if (date_string == undefined) {
    const date = new Date();

    const unix = date.getTime()
    const utc = date.toUTCString()

    res.json({
      unix: unix,
      utc: utc,
    });

    return
  }

  // Regex for digits
  const numbers = /^\d+$/;

  var date = new Date();

  if (date_string.match(numbers)) {
    // Parse non-empty string to int (assumes it is Unix time)
    var date_int = parseInt(date_string, 10)
    date = new Date(date_int);

  } else {
    // Parse non-empty string
    date = new Date(date_string);
  }


  if (date == "Invalid Date") {
    res.json({
      error: "Invalid Date",
    });

    return
  }

  // handle a valid date, and return the correct unix timestamp
  const unix = date.getTime();
  // handle a valid date, and return the correct UTC string
  const utc = date.toUTCString()

  res.json({
    unix: unix,
    utc: utc,
  });

});

// listen for requests :)
var listener = app.listen("3000", function () {
// var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
