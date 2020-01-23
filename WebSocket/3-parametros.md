# Enviando parâmetros do frontend para o backend

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
    console.log(socket.id);
    console.log(socket.handshake.query);
  });
};
```