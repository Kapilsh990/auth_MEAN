require('./config/config');
require('./models/db')

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const userRoute = require('./routes/user.router');

var app = express();

app.use(bodyParser.json());
app.use(cors());

app.use('/api',userRoute);

app.listen(process.env.PORT, ()=> {
    console.log("server started")
})