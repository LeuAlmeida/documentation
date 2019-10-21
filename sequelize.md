# Introdução ao Sequelize

### ORM
* Abstração do banco de dados
* Tabelas viram models
  * users :arrow_right: User.js
  * companies :arrow_right: Company.js
  * projects :arrow_right: Project.js

### Manipulação dos Dados
* Sem SQL *(na maioria das vezes)*;
* Apenas código JavaScript;
  * Exemplo de SQL:

`INSERT INTO Users (name, email)`<br/>
  `VALUES (`<br/>
    `"Leonardo Almeida",`<br/>
    `"leo@webid.net.br"`<br/>
  `)`

  * Exemplo de JavaScript:

  `User.create({`<br/>
    `name: 'Leonardo ALmeida',`<br/>
    `email: 'leo@webid.net.br',`<br/>
  `})`