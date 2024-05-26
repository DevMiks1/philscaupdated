const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
require("dotenv").config()
const jwtAuth = require('./middleware/authmiddleware');

const app = express()
const port = 8800 || 5001

// MIDDLEWARE
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())

// FOR DATABASE 
const database = require("./config/db")
database();

// user accounts
const accountsRoutes = require("./routes/AccountRoutes");
app.use("/accounts", accountsRoutes);


app.listen(port, () => {
  console.log(`You are connecting to port ${port}`);
})
