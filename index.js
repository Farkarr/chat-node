const express = require("express");
const app = express();
const path = require("path");
const SocketIO = require("socket.io");
const bodyParser = require("body-parser");

//Settings
app.set("port", process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//Static files
app.use(express.static(path.join(__dirname, "public")));

// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//Start the server
const server = app.listen(app.get("port"), () => {
    console.log(`Server listening on port: ${app.get("port")}`);
});

//Config of socket.io
const io = SocketIO.listen(server);

//Websockets
io.on("connection", socket => {
    console.log("new connetcion", socket.id)

    socket.on("message", data => {
        io.sockets.emit("message", data);
    });
    
    //broadcast sirve para enviar a todos menos al que esta emitinedo
    socket.on("typing", data => {
        socket.broadcast.emit("typing", data);
    });

    socket.on("image", (from, image) => {
        io.sockets.emit("addImage", from, image);
    });
});
