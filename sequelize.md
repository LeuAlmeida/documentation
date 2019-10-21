# Introdução ao Sequelize

### ORM
* Abstração do banco de dados;
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

### Migrations
* Controle de versão para base de dados;
* Cada arquvo contém instruções para criação, alteração ou remoção de tabelas ou colunas;
* Mantém a base atualizada entre todos desenvolvedores do time e também no ambiente de produção;
* Cada arquivo é uma migration e sua ordenação ocorre por data