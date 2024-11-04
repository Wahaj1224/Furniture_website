require('dotenv').config();

const express = require('express');
const authJwt = require('./helper/jwt');
const mongoose = require('mongoose');
const subscribe_routes=require ('./routes/home');
const post_product=require ('./routes/shop');
const about= require('./routes/about');
const blogs= require('./routes/blogs');
const contact= require('./routes/contact');
const register=require('./routes/users');



const cors = require('cors');
const path = require('path');
// const subscribe_routes = require('./routes/subscribe');
// const workoutRoutes = require('./routes/workouts')

// express app
const app = express()

app.use(cors());

// app.use('/public', express.static('public'));
app.use('/public', express.static(path.join(__dirname, 'public')));



app.use(cors({
  origin: 'http://127.0.0.1:8080', // your front-end URL
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // enable set cookie
}));

// **************************************************
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
// *****************************************************~
// middleware
app.use(express.json())
app.use(authJwt());

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// routes
app.use('/api/furni', subscribe_routes);
app.use('/api/furni', post_product);
app.use('/api/furni', about);
app.use('/api/furni', blogs);
app.use('/api/furni', contact);
app.use('/api/furni',register);



// connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('connected to database')
    // listen to port
    app.listen(process.env.PORT, () => {
      console.log('listening for requests on port', process.env.PORT)
    })
  })
  .catch((err) => {
    console.log(err)
  }) 