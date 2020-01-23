# Instalação do WebSocket no backend

Para instalar o socket, basta rodar o comando `$ yarn add socket.io`

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