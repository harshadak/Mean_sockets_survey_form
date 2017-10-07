var express = require("express");
var bodyParser = require('body-parser');
var path = require("path");

var app = express();

app.use(express.static(path.join(__dirname, "./static")));
app.set('views', path.join(__dirname, './views'));

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(request, response) {
    response.render('index');
});

var server = app.listen(8000, function() {
    console.log("Listening on port 8000");
});

var io = require('socket.io').listen(server);
io.sockets.on('connection', function(socket) {
    console.log("Client/socket is connected!");
    console.log("Client/socket id is: ", socket.id);
    socket.on("posting_form", function (data){
        console.log('My data is: ' + data);
        var rand = Math.floor(Math.random() * 1000) + 1;
        socket.emit('updated_message', {response: data, rand_num: rand});
    })
})