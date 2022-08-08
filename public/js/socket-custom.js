var socket = io(); //Inicializo el servidor

//defino cuando estoy conectado al servidor

socket.on('connect', function () {
    console.log('Connected to server');
});

socket.on('disconnect', function () {
    console.log('Connection lost');
});

//Enviar informacion
/*   socket.emit('enviarMensaje', {
            usuario: 'Fredy',
            mensaje: 'Hola'
        });
    */
//function (resp)  reate la respuesta que viene del servidor
socket.emit('enviarMensaje', {
    usuario: 'Fredy',
    mensaje: 'Hola'
}, function (resp) {
    console.log('server resp: ', resp);
});




// Escuchar informacion
socket.on('enviarMensaje', function (response) {
    console.log('Servidor: ', response);
})