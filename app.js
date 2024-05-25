const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config()
const authRoutes = require('./routes/authRoutes')
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');
const app = express();

// middleware
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser())
app.use(authRoutes)

// view engine
app.set('view engine', 'ejs');

// database connection
mongoose.connect(process.env.MONGO_URL)
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// routes
app.get('*', checkUser)
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', requireAuth, (req, res) => res.render('smoothies'));
