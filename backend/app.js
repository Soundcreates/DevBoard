const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const projectRoutes = require('./routes/projectRoutes');
const taskRoutes = require('./routes/taskRoutes');
const connectDB = require('./config/connectDB');
const userRoutes = require('./routes/userRoutes');
const session = require('express-session');
const passport = require('passport');
require('./config/passport');


dotenv.config();
//google auth section
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));

app.use(passport.initialize());
app.use(passport.session());
//google auth section ends here, from this line is the basic setup of app.js
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
connectDB();

app.use('/api/auth', authRoutes);
app.use('/api/project', projectRoutes);
app.use('/api/task', taskRoutes)
app.use('/api/users', userRoutes);

app.listen(process.env.PORT, () => {
  console.log("conected to port: ", process.env.PORT);
})