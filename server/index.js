const mongoose = require('mongoose');
const express = require("express");
const cors = require('cors');
const app = express();
const port = process.env.PORT || 8080;
const HOST  = '0.0.0.0';
const bodyParser = require("body-parser");
const controller = require("./api/controller");
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cors())
app.use(bodyParser.json({limit: '50mb', type: 'application/json'}));




controller(app);


app.get('/', (req,res) => res.send('API working'));

//Connecting to db
const dbURI = "mongodb+srv://admin:admin@cluster0-mlcah.mongodb.net/test?retryWrites=true&w=majority"

const options = {
  reconnectTries: Number.MAX_VALUE,
  poolSize: 10,
  useNewUrlParser: true  
};

mongoose.connect(dbURI, options).then(
  () => {
    app.listen(port, HOST, () => {
        console.log("Server listening on port " + port);
       
       });
    console.log("Database connection established!");
  },
  err => {
    console.log("Error connecting Database instance due to: ", err);
  }
);

