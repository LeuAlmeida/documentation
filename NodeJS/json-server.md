# Json Server

#### 1. Instalação (global)

`$ npm i --global json-server`

#### 2. Utilização

Execução do arquivo server.json na raíz do repositório

`$ json-server server.json -p 3333 -w`

O **-w** serve para acompanhar esse servidor (não obrigatório) e o -p 3333 seta a porta

#### 3. Requisições

As requisições podem vir normalmente através do arquivo **src/service/api.js**. Exemplo:

```js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3333',
});

export default api;
```