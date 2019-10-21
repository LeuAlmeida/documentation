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

<hr/>

### Exemplo básico de rotas

```js
import { Router } from 'express';   // Importa as rotas do Express

const routes = new Router();        // Cria uma instância de rotas

routes.get('/', (req, res) => {
  return res.json({ message: 'Hello World '});
});

export default routes;              // Exporta as rotas usando o Sucrase
```

<hr/>

### Eslint
`yarn add eslint -D` serve para verificação de padrões de código no ambiente de desenvolvimento. <br/>
`yarn eslint --init` para iniciar as verificações de sintaxes.<br/>
Ao executar o Eslint, aparecerá as seguintes janelas com as seguintes respostas:
```
? How would you like to use ESLint? To check syntax, find problems, and enforce code style
? What type of modules does your project use? JavaScript modules (import/export)
? Which framework does your project use? None of these
? Does your project use TypeScript? No
? Where does your code run? Node
? How would you like to define a style for your project? Use a popular style guide
? Which style guide do you want to follow? Airbnb (https://github.com/airbnb/javascript)
? What format do you want your config file to be in? JavaScript
```
Após isso, será iniciado um *package-lock.json* que deverá ser excluído e rodado um `yarn` na pasta.

O comando `yarn eslint --fix src --ext .js` fará a correção em todos os arquivos .js dentro da pasta *src* (corrigir com o nome da pasta) e a extensão .js

:warning: A configuração do ESLint está no arquivo *.eslintrc.js*

### Postgres + Sequelize
`yarn add sequelize` e `yarn add sequelize-cli` instalará as dependências necessárias para rodar o Sequelize

`yarn add pg pg-hstore` essas duas dependências são necessárias para integrar o Sequelize com o Postgres

#### Criando e rodando uma migration com o Sequelize
`yarn sequelize-cli migration:create --name=create-users` irá criar uma migration com o nome *create-users* de forma pré-definida.

`yarn sequelize db:migrate` serve para gerar esse banco de dados