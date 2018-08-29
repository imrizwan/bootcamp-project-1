const express = require("express");
const app = express();
var bodyParser = require('body-parser');
const mongoose = require("mongoose");
var cors = require('cors');
var http = require('http').Server(app);
var io = require('socket.io')(http);
const path = require("path")

mongoose.connect("mongodb://rizwanshaikh:Hello123@ds237192.mlab.com:37192/olxdb", {
  auth: {
    user: 'rizwanshaikh',
    password: 'Hello123'
  },
  useNewUrlParser: true
}, function (err, client) {
  if (err) {
    console.log(err);
  }
  console.log('connect!!!');
});

// mongoose.connect(
//   "mongodb://localhost:27017/olxdb",
//   { useNewUrlParser: true }
// );
let db = mongoose.connection;

//Check DB Connection
db.once("open", function () {
  console.log("Connected to MongoDB");
});

//Check DB Errors
db.on("error", function (err) {
  console.log(err);
});

//app.set('view engine', 'html');
// app.set('views', path.join(__dirname, '../client'));
// app.use(express.static(path.join(__dirname, '../client')));

//uploads Multer folder
app.use(express.static("./uploads"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// API routes
require('./routes')(app);


//app.use(function (request, response) {
//  response.status(404).send("Page not found!");
//});

app.use(express.static(path.join('..', '..', __dirname, 'build')));

io.on('connection', socket => {
  console.log('User connected')

  socket.on('chat message', function (details) {
    if (!details.message) {
      io.emit('error', "Type a Message!");
    } else io.emit('chat message', details);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})

const port = process.env.PORT || 8080;

http.listen(port, () => console.log("Listening on port 8080!"));