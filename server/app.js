const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const feedRoutes = require('./routes/feed.rout');
const authRoutes = require('./routes/auth.rout');

if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const app = express();

const port = process.env.PORT || 5000;

app.use(bodyParser.json()); // application/json
app.use(bodyParser.urlencoded({ extended: true })); // application/json
app.use(cors());



if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
   
  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'))
  })
}
app.use('/feed', feedRoutes);
app.use('/auth', authRoutes);

mongoose.connect('mongodb+srv://iliyan:codemode8894@cluster0-s4kfe.mongodb.net/dev-social?retryWrites=true&w=majority', {useUnifiedTopology: true, useNewUrlParser: true});
app.listen(port, err => {
  if (err) throw err;
  console.log('Server running on port' + port);
});