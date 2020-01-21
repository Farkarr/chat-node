const file = document.querySelector(".file");
const chatWindow = document.querySelector(".chat-window");

file.addEventListener("change", imagen);

socket.on("addImage", (from, imageBase64) => {
    chatWindow.innerHTML += `<p>${from}: <img src="${imageBase64}" width="200" higth="200"></p>`
});

function imagen(e) {
    let file = e.target.files[0];
    let fileReader = new FileReader();
    fileReader.onload = function (evt) {
        //enviaremos la imagen
        socket.emit("image", username.value, evt.target.result)
    }

    fileReader.readAsDataURL(file);
}