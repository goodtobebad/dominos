// Import express
let express = require('express');
// Import Body parser
let bodyParser = require('body-parser');
// Import Mongoose
let mongoose = require('mongoose');

const cors = require("cors");
// Initialise the app
let app = express();
  
app.use(cors());

// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.urlencoded({limit: '5mb', extended: true}));
// Connect to Mongoose and set connection variable
mongoose.connect('mongodb+srv://goodtobebad:doubleSIS@dominosdb.bunfb.mongodb.net/?retryWrites=true&w=majority&appName=DominosDb',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
).then(() => {
    console.log("Successfully connect to MongoDB.");
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

// Setup server port
var port = process.env.PORT || 8080;

// // Use Api routes in the App
require('./routes/member.routes')(app);

// app.use('*', function(req, res){
//   res.status(404).json({
//       message: "Not found"
//   });
// });

// Launch app to listen to specified port
app.listen(port, function () {
    console.log("Running on port " + port);
});