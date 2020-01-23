# Instalação do WebSocket no backend

Para instalar o socket, basta rodar o comando `$ yarn add socket.io`

**Arquivo index.js**

No mesmo arquivo em que se importa as rotas, cors e afins (podendo ser o App ou Index), deve-se fazer o seguinte:

**Importação do HTTP**

```js
const http = require('http');
```