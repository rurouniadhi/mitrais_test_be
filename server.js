require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require("./api/users/user.router");
const cors = require('cors');
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use("/users", userRoutes);



app.listen(process.env.APP_PORT);
