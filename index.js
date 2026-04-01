const express = require('express');
const app = express();
require("dotenv").config();
const cookieParser = require("cookie-parser");
const cors = require('cors');

const PORT = process.env.PORT || 4000;

const allowedOrigins = ['http://localhost:3000', 'http://localhost:3001'];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(cookieParser());
app.use(express.json());
require("./DBconn/conn");

const GymRoutes = require('./Routes/gym');
const MembershipRoutes = require('./Routes/membership');
const MemberRoutes = require('./Routes/member');

app.use('/auth', GymRoutes);
app.use('/plans', MembershipRoutes);
app.use('/members', MemberRoutes);


app.listen(PORT,()=>{
    console.log(`Server is running on Port ${PORT} successfully`)
})


