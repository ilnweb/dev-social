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
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null,'')
  },
  filename:(req, file, cb) => {
    cb(null, new Date().toString() + '-' + file.originalname);
  }
})
app.use(bodyParser.json()); // application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer({storage:fileStorage}).single('image'))
app.use(cors());



if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
   
  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'))
  })
}
app.use('/feed', feedRoutes);
app.use('/auth', authRoutes);

mongoose.connect(process.env.MONGO_DB_API_KEY, {useUnifiedTopology: true, useNewUrlParser: true});
app.listen(port, err => {
  if (err) throw err;
  console.log('Server running on port' + port);
});