# Utilizando o Socket.io para emitir mensagens do Backend -> Frontend

Com o WebSocket utilizando o *socket.io*, é possível enviar mensagens do Backend -> Frontend utilizando o `socket.emit('message', 'Hello World')` no *Backend* e ouvindo no *Frontend* com `socket.on('message', text => { console.log(text) })`.

### No Backend

**Arquivo src/websocket.js**