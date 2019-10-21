# Módulo 01

### Express
O express é uma lib do NodeJS que executa possibilidades incríveis como servidor.

```js
const express = require('express')
```
Importa o *express* para dentro do backend. O Express retorna uma função, portanto:

```js
const server = express();
```
Para chamar a função retornada pelo Express. O server é uma *instância do express*

```js
server.use(express.json())
```
Para autorizar o uso de dados *.json* pelo epxress

```js
server.listen(3000);
```
Fará com que server (função importada através do express) ouça a porta 3000. Geralmente inserida no final do código *index.js*


### Nodemon
O nodemon serve para atualizar automaticamente a aplicação, quando for salva.
`yarn add nodemon -D` para instalar a dependência apenas no ambiente de desenvolvimento

### Rotas

Exemplo de rotas
```js
import { Router } from 'express';   // Importa as rotas do Express

const routes = new Router();        // Cria uma instância de rotas

routes.get('/', (req, res) => {
  return res.json({ message: 'Hello World '});
});

export default routes;              // Exporta as rotas usando o Sucrase
```