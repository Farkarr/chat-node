const socket = io();    

let message = document.querySelector(".message");
let username = document.querySelector(".username");
let btnSend = document.querySelector(".send");
let chatOutput = document.querySelector(".chat-output");
let actions = document.querySelector(".actions");

btnSend.addEventListener("click", function(){

    socket.emit("message", {
        username: username.value,
        message: message.value
    })
});

message.addEventListener("keydown", () => {
    socket.emit("typing", username.value);
});

socket.on("message", data => {

    actions.innerHTML = "";
    chatOutput.innerHTML += `<p>
        <strong>${data.username}</strong>: ${data.message}
    </p>`
});

socket.on("typing", data => {

    actions.innerHTML = `<p>
        <em>${data} esta escribiendo</em>:
    </p>`
});