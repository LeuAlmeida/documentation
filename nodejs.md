# Módulo 01

### Aula Prática 1 (index.js)
O express é uma lib do NodeJS que executa possibilidades incríveis como servidor.

#### const express = require('express')
Importa o *express* para dentro do backend. O Express retorna uma função, portanto:

#### const server = express();
Para chamar a função retornada pelo Express. O server é uma *instância do express*

#### server.listen(3000);
Fará com que server (função importada através do express) ouça a porta 3000. Geralmente inserida no final do código *index.js*

### O nodemon serve para atualizar automaticamente a aplicação, quando for salva.
`yarn add nodemon -D` para instalar a dependência apenas no ambiente de desenvolvimento

### server.use(express.json())
Para autorizar o uso de dados *.json* pelo epxress