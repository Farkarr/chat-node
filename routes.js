const express = require("express");
const router = express.Router();

const returnRouter = function(io){

    router.get("/test", (req, res, next) => {

        io.on("connection", socket => {
            console.log("new connetcion", socket.id)
            
            // socket.on("message", data => {
            //     io.sockets.emit("message", data);
            // });
            
            // //broadcast sirve para enviar a todos menos al que esta emitinedo
            // socket.on("typing", data => {
            //     socket.broadcast.emit("typing", data);
            // });
        });
    
        // let data = {
        //     user: "farkar"
        // }
    
        // io.on("message", data => {
        //     console.log(data)
        // });
        // res.send({
        //     user: "Karo"
        // });
        
    });

    return router;

}


module.exports = returnRouter;