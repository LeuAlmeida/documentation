# Instalação do WebSocket no backend

Para instalar o socket, basta rodar o comando `$ yarn add socket.io`

Também o express será necessário `$ yarn add express`

**Arquivo index.js**

No mesmo arquivo em que se importa as rotas, cors e afins (podendo ser o App ou Index), deve-se fazer o seguinte:

**Importação do HTTP e definição da variável server**

```js
const http = require('http');

// ....

const app = express();
const server = http.Server(app);
```

**Fazer a aplicação ouvir o server ao invés do app**

```js
server.listen(3333);
```

### Organização dos arquivos

**Arquivo src/websocket.js**
```js
const socketio = require('socket.io');      // Importa o pacote instalado anteriormente

exports.setupWebSocket = (server) => {      // Exporta a instalação do WebSocket (não como padrão) recebendo o server como parâmetro
  const io = socketio(server);              // Cria a variável setando o server como objeto do socket

  io.on('connection', (socket) => {         // Assim que o servidor for conectado, ele recebe o socket e dispara uma função
    console.log(socket.id);
  });
};
```

**Arquivo src/index.js**

```js
// require('dotenv/config');
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
const http = require('http');                       // Importação do HTTP citado anteriormente

// const routes = require('./routes');
const { setupWebSocket } = require('./websocket');  // Importação da configuração do WebSocket

// const app = express();
// const server = http.Server(app);

setupWebSocket(server);                             // Instanciando como servidor do websocket e enviando para o arquivo de configurações externo

// ...
```

# WebSocket no Cliente (Front/Mobile)

Para instalar as dependências do Client (tanto no frontend quanto no mobile), basta rodar o comando `$ yarn add socket.io-client`

**Arquivo src/services/socket.js**

```js
import socketio from 'socket.io-client';

const socket = socketio('http://UrlDoBackend:PortaDoBackend', {
  autoConnect: false,
});

function connect() {
  socket.connect();
}

function disconnect() {
  if (socket.connected) {
    socket.disconnect();
  }
}

export { connect, disconnect };

```

### Arquivo em que será utilizado o websocket, neste caso o src/pages/Main.js

```js
// ...
import { connect, disconnect } from '../services/socket';
// ...

function setupWebsocket() {
  connect();
}

// ...

async function loadDevs() {
    // const { latitude, longitude } = currentRegion;

    // const response = await api.get('/search', {
    //   params: {
    //     latitude,
    //     longitude,
    //     techs: techs.toLowerCase(),
    //   },
    // });

    // setDevs(response.data.devs);
    setupWebsocket();
  }
```
