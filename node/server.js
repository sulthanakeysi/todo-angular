const express = require("express"),
      app = express(),
      router= require("./routes/index"),
      mongoose = require("mongoose"),
      bodyParser = require("body-parser"),
      cors = require("cors");

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

//connecting to database
mongoose.connect("mongodb://sulthana:manjamma10@ds143666.mlab.com:43666/to-do",{ useNewUrlParser: true })
                .then(console.log("database connected"));
      
//routing
app.use('/' , router);

//listening
app.listen(3000, () => console.log("app listening"));