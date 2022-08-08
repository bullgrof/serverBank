require('./config/config');
const path = require('path');
require('dotenv').config({path: path.join(__dirname, './.env')})

const fs = require('fs');

const express = require('express');
const socketIO = require('socket.io'); // import library
const http = require('http'); // upload our server node
var cors = require('cors');


const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); // petitions 
const fileUpload = require('express-fileupload');
//const path = require('path');

app.use(bodyParser.urlencoded({ extended: false })) 

app.use(bodyParser.json())
//FileUpload
app.use(fileUpload());
// setapp CORS
app.use( cors({origin: true, credentials: true}) );

app.use( require('./routes/accounts'));

app.use( require('./routes/user'));
app.use( require('./routes/inscriptions') );
app.use( require('./routes/transfers') );

let server = http.createServer(app); // creo el servidor por donde va a salir la aplicacion

const publicPath = path.resolve(__dirname, '../public');
const port = process.env.PORT || 3000;

app.use(express.static(publicPath));
module.exports.io = socketIO(server); //initialice server


  let connection = mongoose.connect('mongodb+srv://nemessisbank:OVRbLUBcxlBhIaRa@mybank.uv7uxhi.mongodb.net/bankDB',{ useNewUrlParser: true, useUnifiedTopology: true  }, (err, res) => {
 if ( err ) throw err;
 console.log('DATABASE ONLINE');     
});


server.listen(port, (err) => {
    if (err) throw new Error(err);
    console.log(`Server Runingn in ${ port }`);

});