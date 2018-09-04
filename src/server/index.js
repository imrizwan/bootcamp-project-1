const express = require('express');

const app = express();
let bodyParser = require('body-parser');
let functions = require('firebase-functions');
let admin = require('firebase-admin');
let webpush = require('web-push');
const mongoose = require('mongoose');
let cors = require('cors');
const path = require('path');

mongoose.connect('mongodb://rizwanshaikh:Hello123@ds237192.mlab.com:37192/olxdb', {
  auth: {
    user: 'rizwanshaikh',
    password: 'Hello123'
  },
  useNewUrlParser: true
}, (err, client) => {
  if (err) {
    console.log(err);
  }
  console.log('connect!!!');
});

// mongoose.connect(
//   "mongodb://localhost:27017/olxdb",
//   { useNewUrlParser: true }
// );
const db = mongoose.connection;

// Check DB Connection
db.once('open', () => {
  console.log("Connected to MongoDB");
});

// Check DB Errors
db.on('error', (err) => {
  console.log(err);
});

// app.set('view engine', 'html');
// app.set('views', path.join(__dirname, '../client'));
// app.use(express.static(path.join(__dirname, '../client')));

// uploads Multer folder
app.use(express.static('./uploads'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// API routes
require('./routes')(app);


// app.use(function (request, response) {
//  response.status(404).send("Page not found!");
// });

app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/dist/index.html'));
});


// io.on('connection', socket => {
//   console.log('User connected')

//   socket.on('chat message', function (details) {
//     if (!details.message) {
//       io.emit('error', "Type a Message!");
//     } else io.emit('chat message', details);
//   });

//   socket.on('disconnect', () => {
//     console.log('user disconnected')
//   })
// })

let serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://olxpwa-50939.firebaseio.com'
});

exports.storeMSG = functions.https.onRequest((request, response) => {
  cors(request, response, function () {
    admin.database().ref('Chats').push({
      id: request.body.id,
      title: request.body.title,
      location: request.body.location,
      image: request.body.image
    })
      .then(function () {
        webpush.setVapidDetails('mailto:razzyshaikh@gmail.com', 'BM1esoY0GA0p2oaqBQUr8AgWpiLg0ZvTv99JtwSUJWLw3JZrw0fQ_g0fY2IUaTpTziy8RZQe7A154AM-P4yE_xg', 'hQMRQaS_hXtWHhLEap0hP2mYEruTuxbzJO72LZIB8J4');
        return admin.database().ref('subscriptions').once('value');
      })
      .then(function (subscriptions) {
        subscriptions.forEach(function (sub) {
          var pushConfig = {
            endpoint: sub.val().endpoint,
            keys: {
              auth: sub.val().keys.auth,
              p256dh: sub.val().keys.p256dh
            }
          };
          //sending the notification
          webpush.sendNotification(pushConfig, JSON.stringify({ title: 'New Message', content: 'New Msg Added!' }))
            .catch(function (err) {
              console.log(err);
            })
        });
        response.status(201).json({ message: 'Data stored', id: request.body.id });
      })
      .catch(function (err) {
        response.status(500).json({ error: err });
      });
  });
});

const port = process.env.PORT || 8080;

app.listen(port, () => console.log('Listening on port 8080!'));
