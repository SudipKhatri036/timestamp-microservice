// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...

app.get("/api", function (req, res) {
  const date = new Date();
  res.status(200).json({ unix: date.getTime(), utc: date.toUTCString() });
});

app.get("/api/:date", function (req, res) {
  const { date } = req.params;

  const unixTimestampRegex = /^\d{13}$/;

  const userDate = unixTimestampRegex.test(date)
    ? new Date(parseInt(date, 10))
    : new Date(date);

  if (userDate.toString() === "Invalid Date") {
    return res.status(400).json({ error: "Invalid Date" });
  }

  res
    .status(200)
    .json({ unix: userDate.getTime(), utc: userDate.toUTCString() });
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
