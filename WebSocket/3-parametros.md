# Lidando com parâmetros do Frontend para o Backend

### No Frontend

**Arquivo em que se utiliza o socket**

```js
// ...
import { connect, disconnect } from '../services/socket';
// ...

function setupWebsocket() {
  const { latitude, longitude } = currentRegion;

  connect(latitude, longitude, techs);
}
```

### No Backend

**Arquivo src/websocket.js**

```js
const socketio = require('socket.io');

exports.setupWebSocket = (server) => {
  const io = socketio(server);

  io.on('connection', (socket) => {
    console.log(socket.id);               // Retorna o ID da sessão do usuário
    console.log(socket.handshake.query);  // Retorna os parâmetros enviados pelo frontend
  });
};
```