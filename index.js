// Imports
const express = require('express')
const mongoose = require('mongoose')
const multer = require('multer')
const hiking = require('./routes/hikingRoutes')
const hotel = require('./routes/hotelRoutes')
const monument = require('./routes/monumentRoutes')
const museum = require('./routes/museumRoutes')
const user = require('./routes/user')
const authRoutes = require('./routes/authRoutes')
const { requireAuth, checkUser } = require("./middleware/authMiddleware");
const cookieParser = require("cookie-parser")


// Launch Express
const app = express();


// Middlewares
app.use(express.static('public'))
app.use(express.json())
app.use(cookieParser())

// View engine
app.set('view engine', 'ejs')


// Body Parser Middleware for API
app.use(express.json())


// 1- Add DB config 
const db = require('./config/db').URL


// Connect to MongoDB 
mongoose
    .connect(db)
    .then(()=>console.log('MongoDB connected...'))
    .catch(err=> console.log('MongoDB error: '+err))

// 2- Add Routes API ./routes/api
// Items route API Middleware
app.get('*', checkUser)
app.use('/hiking',hiking)
app.use('/hotel',hotel)
app.use('/monument',monument)
app.use('/museum', museum)
app.use('/user',user)
app.use(authRoutes)


// Routes for views
app.get('/', (req, res) => res.render('home'))


// Port for production
const port = process.env.PORT || 5000;

// Launch server
app.listen(port, () => console.log(`Server running on port ${port}...`));


